// Client-safe domain utilities - no server-side dependencies

export interface WhoisData {
  domainName?: string;
  registrar?: string;
  creationDate?: string;
  expirationDate?: string;
  updatedDate?: string;
  status?: string[];
  nameServers?: string[];
  registrant?: {
    name?: string;
    organization?: string;
    email?: string;
    phone?: string;
    address?: string;
  };
  admin?: {
    name?: string;
    organization?: string;
    email?: string;
    phone?: string;
  };
  tech?: {
    name?: string;
    organization?: string;
    email?: string;
    phone?: string;
  };
  raw?: string;
}

export interface ExpiredDomainData {
  domain: string;
  expirationDate: string;
  daysExpired: number;
  domainAge: number;
  backlinks: number;
  domainAuthority: number;
  estimatedValue: number;
  category: string;
  status: string;
  lastChecked: string;
}

// Client-safe domain validation
export const validateDomain = (domain: string): boolean => {
  if (!domain) return false;
  
  // Clean the domain input
  const cleanDomain = domain.toLowerCase().trim();
  
  // Remove protocol if present
  const domainWithoutProtocol = cleanDomain.replace(/^https?:\/\//, '');
  
  // Remove path if present
  const domainOnly = domainWithoutProtocol.split('/')[0];
  
  // Basic domain validation regex
  const domainRegex = /^[a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(\.[a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  
  return domainRegex.test(domainOnly) && domainOnly.includes('.');
};

// Client-safe domain extraction
export const extractDomainFromUrl = (url: string): string | null => {
  try {
    // Remove protocol
    let domain = url.replace(/^https?:\/\//, '');
    
    // Remove path and query parameters
    domain = domain.split('/')[0];
    domain = domain.split('?')[0];
    domain = domain.split('#')[0];
    
    // Remove port if present
    domain = domain.split(':')[0];
    
    return domain || null;
  } catch {
    return null;
  }
};

// Client-safe WHOIS lookup using apilayer.com API
export const performWhoisLookup = async (domain: string): Promise<WhoisData> => {
  try {
    if (!validateDomain(domain)) {
      throw new Error('Invalid domain format');
    }

    // Clean the domain
    const cleanDomain = domain.toLowerCase().trim().replace(/^https?:\/\//, '').split('/')[0];
    
    // Get API key from environment variable
    const apiKey = process.env.NEXT_PUBLIC_WHOIS_API_KEY;
    
    if (!apiKey) {
      throw new Error('WHOIS API key not configured. Please set NEXT_PUBLIC_WHOIS_API_KEY environment variable.');
    }

    // Use apilayer.com WHOIS API
    const apiUrl = `https://api.apilayer.com/whois/query?domain=${encodeURIComponent(cleanDomain)}`;
    
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'apikey': apiKey,
        'Accept': 'application/json',
      },
      redirect: 'follow' as RequestRedirect,
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`WHOIS API error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    
    // Parse the apilayer.com response format
    if (data.result) {
      return parseApilayerWhoisData(data.result, cleanDomain);
    }
    
    // If no result, try to parse as direct data
    return parseApilayerWhoisData(data, cleanDomain);
  } catch (error) {
    console.error('WHOIS lookup error:', error);
    throw new Error(`Failed to perform WHOIS lookup: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};

// Helper function to parse apilayer.com WHOIS response
const parseApilayerWhoisData = (result: any, domain: string): WhoisData => {
  const structuredData: WhoisData = {
    domainName: result.domain_name || domain,
    registrar: result.registrar || 'Unknown',
    creationDate: result.creation_date || undefined,
    expirationDate: result.expiration_date || undefined,
    updatedDate: result.updated_date || undefined,
    status: Array.isArray(result.status) ? result.status : result.status ? [result.status] : [],
    nameServers: Array.isArray(result.name_servers) ? result.name_servers : result.name_servers ? [result.name_servers] : [],
    raw: JSON.stringify(result, null, 2),
  };

  // Parse registrant information
  if (result.name || result.org || result.emails || result.address || result.city || result.country) {
    // Combine address fields if available
    const addressParts = [
      result.address,
      result.city,
      result.state,
      result.zipcode,
      result.country,
    ].filter(Boolean);
    
    structuredData.registrant = {
      name: result.name || undefined,
      organization: result.org || undefined,
      email: result.emails ? (Array.isArray(result.emails) ? result.emails[0] : result.emails) : undefined,
      address: addressParts.length > 0 ? addressParts.join(', ') : result.address || undefined,
    };
  }

  return structuredData;
};

// Helper function to parse WHOIS data from JSON response (legacy support)
const parseWhoisData = (whoisData: any, domain: string): WhoisData => {
  const structuredData: WhoisData = {
    domainName: domain,
    raw: JSON.stringify(whoisData, null, 2),
  };

  // Handle whoisxmlapi.com format
  if (whoisData?.WhoisRecord) {
    const record = whoisData.WhoisRecord;
    
    structuredData.registrar = record?.registrarName || 'Unknown';
    structuredData.creationDate = record?.createdDate;
    structuredData.expirationDate = record?.expiresDate;
    structuredData.updatedDate = record?.updatedDate;
    structuredData.status = record?.status ? [record.status] : [];
    structuredData.nameServers = record?.nameServers?.hostNames || [];
    
    if (record?.registrant) {
      structuredData.registrant = {
        name: record.registrant.name,
        organization: record.registrant.organization,
        email: record.registrant.email,
        phone: record.registrant.telephone,
        address: record.registrant.street1,
      };
    }
    
    if (record?.administrativeContact) {
      structuredData.admin = {
        name: record.administrativeContact.name,
        organization: record.administrativeContact.organization,
        email: record.administrativeContact.email,
        phone: record.administrativeContact.telephone,
      };
    }
    
    if (record?.technicalContact) {
      structuredData.tech = {
        name: record.technicalContact.name,
        organization: record.technicalContact.organization,
        email: record.technicalContact.email,
        phone: record.technicalContact.telephone,
      };
    }
    
    return structuredData;
  }

  // Handle ipwhois.app format
  if (whoisData?.domain) {
    structuredData.domainName = whoisData.domain;
    structuredData.registrar = whoisData.registrar || 'Unknown';
    structuredData.creationDate = whoisData.created;
    structuredData.expirationDate = whoisData.expires;
    structuredData.updatedDate = whoisData.updated;
    structuredData.nameServers = whoisData.nameservers || [];
    
    if (whoisData.registrant) {
      structuredData.registrant = {
        name: whoisData.registrant.name,
        organization: whoisData.registrant.organization,
        email: whoisData.registrant.email,
        phone: whoisData.registrant.phone,
        address: whoisData.registrant.address,
      };
    }
    
    return structuredData;
  }

  // Handle generic format - try to extract common fields
  structuredData.registrar = whoisData?.registrar || whoisData?.registrarName || 'Unknown';
  structuredData.creationDate = whoisData?.creationDate || whoisData?.created || whoisData?.createdDate;
  structuredData.expirationDate = whoisData?.expirationDate || whoisData?.expires || whoisData?.expiryDate;
  structuredData.updatedDate = whoisData?.updatedDate || whoisData?.updated;
  structuredData.status = whoisData?.status ? (Array.isArray(whoisData.status) ? whoisData.status : [whoisData.status]) : [];
  structuredData.nameServers = whoisData?.nameServers || whoisData?.nameservers || whoisData?.nameServer || [];

  if (whoisData?.registrant) {
    structuredData.registrant = {
      name: whoisData.registrant.name,
      organization: whoisData.registrant.organization,
      email: whoisData.registrant.email,
      phone: whoisData.registrant.phone || whoisData.registrant.telephone,
      address: whoisData.registrant.address || whoisData.registrant.street1,
    };
  }

  if (whoisData?.admin || whoisData?.administrativeContact) {
    const admin = whoisData.admin || whoisData.administrativeContact;
    structuredData.admin = {
      name: admin.name,
      organization: admin.organization,
      email: admin.email,
      phone: admin.phone || admin.telephone,
    };
  }

  if (whoisData?.tech || whoisData?.technicalContact) {
    const tech = whoisData.tech || whoisData.technicalContact;
    structuredData.tech = {
      name: tech.name,
      organization: tech.organization,
      email: tech.email,
      phone: tech.phone || tech.telephone,
    };
  }

  return structuredData;
};

// Helper function to parse WHOIS data from HTML (fallback)
const parseWhoisFromHtml = (html: string, domain: string): WhoisData => {
  // Basic parsing from HTML - this is a fallback
  const structuredData: WhoisData = {
    domainName: domain,
    raw: html,
  };

  // Create a temporary DOM element to parse HTML
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');
  const textContent = doc.body.textContent || html;

  // Try to extract basic information from HTML/text
  const patterns = {
    registrar: [
      /Registrar[:\s]+([^\n<]+)/i,
      /Registrar Name[:\s]+([^\n<]+)/i,
      /Registrar:\s*([^\n<]+)/i,
    ],
    creationDate: [
      /Creation Date[:\s]+([^\n<]+)/i,
      /Created[:\s]+([^\n<]+)/i,
      /Registered[:\s]+([^\n<]+)/i,
      /Registration Date[:\s]+([^\n<]+)/i,
    ],
    expirationDate: [
      /Expiry Date[:\s]+([^\n<]+)/i,
      /Expiration Date[:\s]+([^\n<]+)/i,
      /Expires[:\s]+([^\n<]+)/i,
      /Registry Expiry Date[:\s]+([^\n<]+)/i,
    ],
    updatedDate: [
      /Updated Date[:\s]+([^\n<]+)/i,
      /Last Updated[:\s]+([^\n<]+)/i,
      /Modified[:\s]+([^\n<]+)/i,
    ],
    nameServers: [
      /Name Server[:\s]+([^\n<]+)/gi,
      /Nameserver[:\s]+([^\n<]+)/gi,
    ],
  };

  // Extract registrar
  for (const pattern of patterns.registrar) {
    const match = textContent.match(pattern);
    if (match) {
      structuredData.registrar = match[1].trim();
      break;
    }
  }

  // Extract creation date
  for (const pattern of patterns.creationDate) {
    const match = textContent.match(pattern);
    if (match) {
      structuredData.creationDate = match[1].trim();
      break;
    }
  }

  // Extract expiration date
  for (const pattern of patterns.expirationDate) {
    const match = textContent.match(pattern);
    if (match) {
      structuredData.expirationDate = match[1].trim();
      break;
    }
  }

  // Extract updated date
  for (const pattern of patterns.updatedDate) {
    const match = textContent.match(pattern);
    if (match) {
      structuredData.updatedDate = match[1].trim();
      break;
    }
  }

  // Extract name servers
  const nameServerMatches: string[] = [];
  for (const pattern of patterns.nameServers) {
    const matches = Array.from(textContent.matchAll(pattern));
    for (const match of matches) {
      if (match[1]) {
        nameServerMatches.push(match[1].trim());
      }
    }
  }
  if (nameServerMatches.length > 0) {
    structuredData.nameServers = Array.from(new Set(nameServerMatches)); // Remove duplicates
  }

  return structuredData;
};

export const searchExpiredDomains = async (
  keyword: string,
  filters: {
    minAge?: string;
    maxAge?: string;
    minBacklinks?: string;
    minDomainAuthority?: string;
    maxDaysExpired?: string;
    categories?: string[];
    status?: string[];
  }
): Promise<ExpiredDomainData[]> => {
  try {
    // This is a mock implementation since real expired domain APIs require paid subscriptions
    // In a real implementation, you would integrate with services like:
    // - GoDaddy Auctions API
    // - NameJet API
    // - SnapNames API
    // - DomainTools API
    
    await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate API delay
    
    // Mock data based on search criteria
    const mockResults: ExpiredDomainData[] = [
      {
        domain: `${keyword}tech.com`,
        expirationDate: "2024-01-15",
        daysExpired: 45,
        domainAge: 5,
        backlinks: 1250,
        domainAuthority: 45,
        estimatedValue: 2500,
        category: "Technology",
        status: "expired",
        lastChecked: new Date().toISOString()
      },
      {
        domain: `${keyword}health.net`,
        expirationDate: "2024-02-01",
        daysExpired: 28,
        domainAge: 8,
        backlinks: 3200,
        domainAuthority: 52,
        estimatedValue: 4200,
        category: "Health",
        status: "pending-delete",
        lastChecked: new Date().toISOString()
      },
      {
        domain: `${keyword}business.org`,
        expirationDate: "2024-01-20",
        daysExpired: 40,
        domainAge: 12,
        backlinks: 8900,
        domainAuthority: 68,
        estimatedValue: 8500,
        category: "Business",
        status: "available",
        lastChecked: new Date().toISOString()
      },
      {
        domain: `${keyword}edu.io`,
        expirationDate: "2024-02-10",
        daysExpired: 19,
        domainAge: 3,
        backlinks: 450,
        domainAuthority: 32,
        estimatedValue: 1800,
        category: "Education",
        status: "expired",
        lastChecked: new Date().toISOString()
      },
      {
        domain: `${keyword}shop.com`,
        expirationDate: "2024-01-25",
        daysExpired: 35,
        domainAge: 7,
        backlinks: 2100,
        domainAuthority: 48,
        estimatedValue: 3200,
        category: "Shopping",
        status: "pending-delete",
        lastChecked: new Date().toISOString()
      }
    ];

    // Apply filters
    let filteredResults = mockResults;

    if (filters.minAge) {
      const minAge = parseInt(filters.minAge);
      filteredResults = filteredResults.filter(domain => domain.domainAge >= minAge);
    }

    if (filters.maxAge) {
      const maxAge = parseInt(filters.maxAge);
      filteredResults = filteredResults.filter(domain => domain.domainAge <= maxAge);
    }

    if (filters.minBacklinks) {
      const minBacklinks = parseInt(filters.minBacklinks);
      filteredResults = filteredResults.filter(domain => domain.backlinks >= minBacklinks);
    }

    if (filters.minDomainAuthority) {
      const minDA = parseInt(filters.minDomainAuthority);
      filteredResults = filteredResults.filter(domain => domain.domainAuthority >= minDA);
    }

    if (filters.maxDaysExpired) {
      const maxDays = parseInt(filters.maxDaysExpired);
      filteredResults = filteredResults.filter(domain => domain.daysExpired <= maxDays);
    }

    if (filters.categories && filters.categories.length > 0) {
      filteredResults = filteredResults.filter(domain => 
        filters.categories!.includes(domain.category)
      );
    }

    if (filters.status && filters.status.length > 0) {
      filteredResults = filteredResults.filter(domain => 
        filters.status!.includes(domain.status)
      );
    }

    return filteredResults;
  } catch (error) {
    console.error('Expired domain search error:', error);
    throw new Error(`Failed to search expired domains: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};

export const formatWhoisDate = (dateString: string): string => {
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      timeZoneName: 'short'
    });
  } catch {
    return dateString;
  }
};

export const getDomainStatusColor = (status: string): string => {
  switch (status.toLowerCase()) {
    case 'active':
    case 'ok':
      return 'green';
    case 'expired':
    case 'pending-delete':
      return 'red';
    case 'pending-transfer':
      return 'yellow';
    case 'client-hold':
    case 'server-hold':
      return 'orange';
    default:
      return 'gray';
  }
};

export const calculateDomainAge = (creationDate: string): number => {
  try {
    const creation = new Date(creationDate);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - creation.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  } catch {
    return 0;
  }
};

export const estimateDomainValue = (
  domainAuthority: number,
  backlinks: number,
  domainAge: number
): number => {
  // Simple estimation algorithm
  const baseValue = 100;
  const daMultiplier = domainAuthority * 50;
  const backlinkMultiplier = backlinks * 0.5;
  const ageMultiplier = domainAge * 10;
  
  return Math.round(baseValue + daMultiplier + backlinkMultiplier + ageMultiplier);
};
