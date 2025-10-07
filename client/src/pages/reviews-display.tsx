import { useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ExternalLink, Star } from 'lucide-react';
import { Link } from 'wouter';

export default function ReviewsDisplay() {
  // Load Trustpilot script and initialize TrustBox widget
  useEffect(() => {
    // Add Trustpilot script if not already loaded
    if (!document.querySelector('script[src*="trustpilot.com"]')) {
      const script = document.createElement('script');
      script.src = 'https://widget.trustpilot.com/bootstrap/v5/tp.widget.bootstrap.min.js';
      script.async = true;
      document.head.appendChild(script);

      script.onload = () => {
        // Initialize all Trustpilot widgets after script loads
        if (window.Trustpilot) {
          // Initialize both TrustBox widgets
          const widget1 = document.getElementById('trustpilot-widget');
          const widget2 = document.querySelector('[data-testid="trustpilot-reviews-widget"]') as HTMLElement;
          if (widget1) window.Trustpilot.loadFromElement(widget1);
          if (widget2) window.Trustpilot.loadFromElement(widget2);
        }
      };
    } else {
      // Script already loaded, initialize all widgets
      if (window.Trustpilot) {
        const widget1 = document.getElementById('trustpilot-widget');
        const widget2 = document.querySelector('[data-testid="trustpilot-reviews-widget"]') as HTMLElement;
        if (widget1) window.Trustpilot.loadFromElement(widget1);
        if (widget2) window.Trustpilot.loadFromElement(widget2);
      }
    }
  }, []);

  return (
    <div className="min-h-screen py-8 px-4 bg-background">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link href="/" data-testid="link-back">
              <Button variant="outline" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
            </Link>
            <h1 className="text-3xl font-bold text-foreground" data-testid="title">
              Customer Reviews
            </h1>
          </div>
          <a 
            href="https://www.trustpilot.com/evaluate/all-stars-motorsport.com"
            target="_blank"
            rel="noopener noreferrer"
            data-testid="link-leave-review"
          >
            <Button className="w-full bg-[#04da8d] hover:bg-[#009a67] text-white">
              <Star className="w-4 h-4 mr-2" />
              Leave a Review
              <ExternalLink className="w-4 h-4 ml-2" />
            </Button>
          </a>
        </div>

        {/* Trustpilot Company Info Widget */}
        <Card className="mb-8 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <img 
                src="https://cdn.worldvectorlogo.com/logos/stars-5-1.svg" 
                alt="Trustpilot" 
                className="w-24 h-18"
              />
              All-Stars Motorsport on Trustpilot
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* Company Info TrustBox */}
              <div 
                id="trustpilot-widget"
                className="trustpilot-widget" 
                data-locale="en-US"
                data-template-id="5419b6a8b0d04a076446a9ad"
                data-businessunit-id={import.meta.env.VITE_TRUSTPILOT_BUSINESS_UNIT_ID || "507f191e810c19729de860ea"}
                data-style-height="24px"
                data-style-width="100%"
                data-theme="light"
                data-min-review-count="1"
                data-without-reviews-preferred-string-id="1"
                data-testid="trustpilot-company-widget"
              >
                <a 
                  href="https://www.trustpilot.com/review/all-stars-motorsport.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800"
                >
                  View our Trustpilot reviews
                </a>
              </div>

              {/* Manual fallback while widget loads */}
              <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-6 text-center">
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold">See what our customers say</h3>
                  <p className="text-muted-foreground">
                    Read verified reviews from real customers on Trustpilot
                  </p>
                  <a 
                    href="https://www.trustpilot.com/review/all-stars-motorsport.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-[#04da8d] hover:bg-[#009a67] text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    <Star className="w-4 h-4" />
                    View Reviews on Trustpilot
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Service Reviews TrustBox */}
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>Recent Customer Reviews</CardTitle>
          </CardHeader>
          <CardContent>
            <div 
              className="trustpilot-widget" 
              data-locale="en-US"
              data-template-id="5419b6ffb0d04a076446a9af"
              data-businessunit-id={import.meta.env.VITE_TRUSTPILOT_BUSINESS_UNIT_ID || "507f191e810c19729de860ea"}
              data-style-height="500px"
              data-style-width="100%"
              data-theme="light"
              data-stars="1,2,3,4,5"
              data-review-languages="en"
              data-testid="trustpilot-reviews-widget"
            >
              {/* Fallback content while widget loads */}
              <div className="text-center py-12">
                <div className="animate-pulse space-y-4">
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mx-auto"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mx-auto"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6 mx-auto"></div>
                </div>
                <p className="mt-6 text-muted-foreground">Loading reviews...</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Additional Info */}
        <div className="mt-8 text-center space-y-2">
          <p className="text-sm text-muted-foreground">
            All reviews are verified by Trustpilot and come from real customers
          </p>
          <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground">
            <span>✓ Independent reviews</span>
            <span>✓ Verified purchases</span>
            <span>✓ Transparent feedback</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// Extend Window interface for TypeScript
declare global {
  interface Window {
    Trustpilot: {
      loadFromElement: (element: HTMLElement | null) => void;
    };
  }
}