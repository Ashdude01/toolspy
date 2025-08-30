// Server-side domain utilities - can use server-side packages
import whois from 'whois-json';
import isValidDomain from 'is-valid-domain';
import extractDomain from 'extract-domain';

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

export const validateDomain = (domain: string): boolean => {
  if (!domain) return false;
  
  // Clean the domain input
  const cleanDomain = domain.toLowerCase().trim();
  
  // Remove protocol if present
  const domainWithoutProtocol = cleanDomain.replace(/^https?:\/\//, '');
  
  // Remove path if present
  const domainOnly = domainWithoutProtocol.split('/')[0];
  
  return isValidDomain(domainOnly);
};

export const extractDomainFromUrl = async (url: string): Promise<string | null> => {
  try {
    const domain = await extractDomain(url);
    
    // Handle different return types from extractDomain
    if (typeof domain === 'string') {
      return domain || null;
    } else if (Array.isArray(domain)) {
      return domain[0] || null;
    } else if (domain && typeof domain === 'object' && 'url' in domain) {
      return (domain as any).url || null;
    }
    
    return null;
  } catch {
    return null;
  }
};

export const performWhoisLookup = async (domain: string): Promise<WhoisData> => {
  try {
    if (!validateDomain(domain)) {
      throw new Error('Invalid domain format');
    }

    // Clean the domain
    const cleanDomain = domain.toLowerCase().trim().replace(/^https?:\/\//, '').split('/')[0];
    
    const whoisData = await whois(cleanDomain);
    
    // Parse and structure the WHOIS data
    const structuredData: WhoisData = {
      domainName: cleanDomain,
      raw: JSON.stringify(whoisData, null, 2)
    };

    // Extract common fields from the raw WHOIS data
    if (whoisData && Array.isArray(whoisData) && whoisData.length > 0) {
      const firstResult = whoisData[0] as any;
      
      // Registrar information
      if (firstResult?.registrar) {
        structuredData.registrar = Array.isArray(firstResult.registrar) 
          ? firstResult.registrar[0] 
          : firstResult.registrar;
      }

      // Dates
      if (firstResult?.creationDate) {
        structuredData.creationDate = Array.isArray(firstResult.creationDate)
          ? firstResult.creationDate[0]
          : firstResult.creationDate;
      }

      if (firstResult?.expirationDate) {
        structuredData.expirationDate = Array.isArray(firstResult.expirationDate)
          ? firstResult.expirationDate[0]
          : firstResult.expirationDate;
      }

      if (firstResult?.updatedDate) {
        structuredData.updatedDate = Array.isArray(firstResult.updatedDate)
          ? firstResult.updatedDate[0]
          : firstResult.updatedDate;
      }

      // Status
      if (firstResult?.status) {
        structuredData.status = Array.isArray(firstResult.status)
          ? firstResult.status
          : [firstResult.status];
      }

      // Name servers
      if (firstResult?.nameServer) {
        structuredData.nameServers = Array.isArray(firstResult.nameServer)
          ? firstResult.nameServer
          : [firstResult.nameServer];
      }

      // Registrant information
      if (firstResult?.registrant) {
        structuredData.registrant = {
          name: firstResult.registrant.name,
          organization: firstResult.registrant.organization,
          email: firstResult.registrant.email,
          phone: firstResult.registrant.phone,
          address: firstResult.registrant.address
        };
      }

      // Admin information
      if (firstResult?.admin) {
        structuredData.admin = {
          name: firstResult.admin.name,
          organization: firstResult.admin.organization,
          email: firstResult.admin.email,
          phone: firstResult.admin.phone
        };
      }

      // Tech information
      if (firstResult?.tech) {
        structuredData.tech = {
          name: firstResult.tech.name,
          organization: firstResult.tech.organization,
          email: firstResult.tech.email,
          phone: firstResult.tech.phone
        };
      }
    }

    return structuredData;
  } catch (error) {
    console.error('WHOIS lookup error:', error);
    throw new Error(`Failed to perform WHOIS lookup: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};
