import { NextRequest, NextResponse } from 'next/server';
import { performWhoisLookup, validateDomain } from '@/lib/utils/domain-utils-server';

export async function POST(request: NextRequest) {
  try {
    const { domain } = await request.json();

    if (!domain || typeof domain !== 'string') {
      return NextResponse.json(
        { error: 'Domain parameter is required' },
        { status: 400 }
      );
    }

    if (!validateDomain(domain)) {
      return NextResponse.json(
        { error: 'Invalid domain format' },
        { status: 400 }
      );
    }

    const whoisData = await performWhoisLookup(domain);

    return NextResponse.json(whoisData);

  } catch (error) {
    console.error('WHOIS API error:', error);
    
    return NextResponse.json(
      { 
        error: 'Failed to perform WHOIS lookup',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const domain = searchParams.get('domain');

  if (!domain) {
    return NextResponse.json(
      { error: 'Domain parameter is required' },
      { status: 400 }
    );
  }

  try {
    if (!validateDomain(domain)) {
      return NextResponse.json(
        { error: 'Invalid domain format' },
        { status: 400 }
      );
    }

    const whoisData = await performWhoisLookup(domain);

    return NextResponse.json(whoisData);

  } catch (error) {
    console.error('WHOIS API error:', error);
    
    return NextResponse.json(
      { 
        error: 'Failed to perform WHOIS lookup',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
