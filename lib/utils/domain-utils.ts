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

// Client-safe WHOIS lookup (will be handled by API route)
export const performWhoisLookup = async (domain: string): Promise<WhoisData> => {
  try {
    if (!validateDomain(domain)) {
      throw new Error('Invalid domain format');
    }

    // Clean the domain
    const cleanDomain = domain.toLowerCase().trim().replace(/^https?:\/\//, '').split('/')[0];
    
    // Call the API route instead of using server-side packages
    const response = await fetch('/api/whois', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ domain: cleanDomain }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('WHOIS lookup error:', error);
    throw new Error(`Failed to perform WHOIS lookup: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
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
