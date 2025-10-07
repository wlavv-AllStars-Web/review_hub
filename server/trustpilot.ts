// Trustpilot API integration service
// All-Stars Motorsport Business Unit: all-stars-motorsport.com

// Note: For production, you would need:
// 1. Trustpilot API credentials (API key for public endpoints, OAuth token for private endpoints)
// 2. Business Unit ID (found via Trustpilot API)
// 3. To store these securely in environment variables

export interface TrustpilotInvitationRequest {
  customerName: string;
  customerEmail: string;
  referenceId?: string;
}

export interface TrustpilotInvitationResponse {
  invitationUrl: string;
  success: boolean;
  message?: string;
}

// For now, we'll create a direct Trustpilot review URL
// In production, you would use the Trustpilot Invitation API
export async function generateTrustpilotInvitation(request: TrustpilotInvitationRequest): Promise<TrustpilotInvitationResponse> {
  try {
    // For All-Stars Motorsport, generate a direct review URL
    // Using standard .com domain for broader compatibility
    const baseUrl = 'https://www.trustpilot.com/evaluate/all-stars-motorsport.com';
    
    // For privacy protection, we don't include customer email in the URL
    // Only include reference ID if provided (no PII)
    const params = new URLSearchParams();
    if (request.referenceId) {
      params.append('ref', request.referenceId);
    }
    
    const invitationUrl = params.toString() ? `${baseUrl}?${params.toString()}` : baseUrl;
    
    return {
      invitationUrl,
      success: true,
      message: 'Trustpilot review link generated successfully'
    };
  } catch (error) {
    console.error('Error generating Trustpilot invitation:', error);
    return {
      invitationUrl: 'https://www.trustpilot.com/evaluate/all-stars-motorsport.com',
      success: false,
      message: 'Failed to generate invitation URL, using default link'
    };
  }
}

// Function to get business unit ID (for future API integration)
export async function getTrustpilotBusinessUnit(domain: string): Promise<string | null> {
  try {
    // This would require a Trustpilot API key in production
    // For now, return null to indicate manual setup needed
    console.log(`Business unit lookup for ${domain} - API key required`);
    return null;
  } catch (error) {
    console.error('Error fetching business unit:', error);
    return null;
  }
}

// Function to send invitation via Trustpilot API (requires OAuth token)
export async function sendTrustpilotInvitation(request: TrustpilotInvitationRequest): Promise<TrustpilotInvitationResponse> {
  try {
    // This would require OAuth token and business unit ID in production
    // For now, just generate the URL
    return generateTrustpilotInvitation(request);
  } catch (error) {
    console.error('Error sending Trustpilot invitation:', error);
    return {
      invitationUrl: 'https://www.trustpilot.com/evaluate/all-stars-motorsport.com',
      success: false,
      message: 'Failed to send invitation'
    };
  }
}