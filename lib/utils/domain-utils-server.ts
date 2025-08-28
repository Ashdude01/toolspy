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

export const extractDomainFromUrl = (url: string): string | null => {
  try {
    const domain = extractDomain(url);
    return domain || null;
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
    if (whoisData) {
      // Registrar information
      if (whoisData.registrar) {
        structuredData.registrar = Array.isArray(whoisData.registrar) 
          ? whoisData.registrar[0] 
          : whoisData.registrar;
      }

      // Dates
      if (whoisData.creationDate) {
        structuredData.creationDate = Array.isArray(whoisData.creationDate)
          ? whoisData.creationDate[0]
          : whoisData.creationDate;
      }

      if (whoisData.expirationDate) {
        structuredData.expirationDate = Array.isArray(whoisData.expirationDate)
          ? whoisData.expirationDate[0]
          : whoisData.expirationDate;
      }

      if (whoisData.updatedDate) {
        structuredData.updatedDate = Array.isArray(whoisData.updatedDate)
          ? whoisData.updatedDate[0]
          : whoisData.updatedDate;
      }

      // Status
      if (whoisData.status) {
        structuredData.status = Array.isArray(whoisData.status)
          ? whoisData.status
          : [whoisData.status];
      }

      // Name servers
      if (whoisData.nameServer) {
        structuredData.nameServers = Array.isArray(whoisData.nameServer)
          ? whoisData.nameServer
          : [whoisData.nameServer];
      }

      // Registrant information
      if (whoisData.registrant) {
        structuredData.registrant = {
          name: whoisData.registrant.name,
          organization: whoisData.registrant.organization,
          email: whoisData.registrant.email,
          phone: whoisData.registrant.phone,
          address: whoisData.registrant.address
        };
      }

      // Admin information
      if (whoisData.admin) {
        structuredData.admin = {
          name: whoisData.admin.name,
          organization: whoisData.admin.organization,
          email: whoisData.admin.email,
          phone: whoisData.admin.phone
        };
      }

      // Tech information
      if (whoisData.tech) {
        structuredData.tech = {
          name: whoisData.tech.name,
          organization: whoisData.tech.organization,
          email: whoisData.tech.email,
          phone: whoisData.tech.phone
        };
      }
    }

    return structuredData;
  } catch (error) {
    console.error('WHOIS lookup error:', error);
    throw new Error(`Failed to perform WHOIS lookup: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};
