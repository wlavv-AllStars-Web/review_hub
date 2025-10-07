import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { apiRequest, queryClient } from '@/lib/queryClient';
import { compressFile } from '@/lib/compression';
import { uploadFile } from '@/lib/supabase';
import {
  ExternalLink,
  Star,
  CheckCircle,
  Eye,
  Upload,
  X,
  Facebook,
  Instagram,
  MessageCircle,
} from 'lucide-react';
import { SiTiktok } from 'react-icons/si';
import { Link } from 'wouter';
import type { TrustpilotInvitation, InsertReview } from '@shared/schema';

export default function Review() {
  // Trustpilot form state
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [referenceId, setReferenceId] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [invitationUrl, setInvitationUrl] = useState('');

  // Image submission state
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [showImageSuccess, setShowImageSuccess] = useState(false);

  // Social button state
  const [socialExpanded, setSocialExpanded] = useState(false);

  const { toast } = useToast();

  // Trustpilot submission mutation
  const submitMutation = useMutation({
    mutationFn: async (data: TrustpilotInvitation) => {
      const response = await apiRequest('POST', '/api/trustpilot/invitation', data);
      return response.json();
    },
    onSuccess: (data) => {
      setShowSuccess(true);
      setInvitationUrl(data.invitationUrl);
      setCustomerName('');
      setCustomerEmail('');
      setReferenceId('');
      toast({
        title: 'Success!',
        description: 'Your Trustpilot review link has been generated',
      });
      setTimeout(() => {
        setShowSuccess(false);
      }, 10000);
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: error.message || 'Failed to generate review link',
        variant: 'destructive',
      });
    },
  });

  // Image review submission mutation
  const imageReviewMutation = useMutation({
    mutationFn: async (data: InsertReview) => {
      const response = await apiRequest('POST', '/api/reviews', data);
      return response.json();
    },
    onSuccess: () => {
      setShowImageSuccess(true);
      setSelectedFiles([]);
      toast({
        title: 'Success!',
        description: 'Your photos have been uploaded successfully',
      });
      setTimeout(() => {
        setShowImageSuccess(false);
      }, 5000);
      queryClient.invalidateQueries({ queryKey: ['/api/reviews'] });
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: error.message || 'Failed to submit review',
        variant: 'destructive',
      });
    },
  });

  // Trustpilot form handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim() || !customerEmail.trim()) {
      toast({
        title: 'Missing information',
        description: 'Please provide your name and email address',
        variant: 'destructive',
      });
      return;
    }
    await submitMutation.mutateAsync({
      customerName: customerName.trim(),
      customerEmail: customerEmail.trim(),
      referenceId: referenceId.trim() || undefined,
    });
  };

  const handleReviewClick = () => {
    if (invitationUrl) {
      const width = 600;
      const height = 700;
      const left = (window.screen.width - width) / 2;
      const top = (window.screen.height - height) / 2;
      const features = `width=${width},height=${height},left=${left},top=${top},toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=yes,noopener,noreferrer`;
      const popup = window.open(invitationUrl, 'TrustpilotReview', features);
      if (!popup) {
        window.open(invitationUrl, '_blank', 'noopener,noreferrer');
        toast({
          title: 'Opening in new tab',
          description: 'Please allow popups for a better experience',
        });
      }
    }
  };

  // File selection handler
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const validFiles = files.filter(
      (file) =>
        (file.type.startsWith('image/') || file.type.startsWith('video/')) &&
        file.size <= 10 * 1024 * 1024 // 10MB limit
    );
    if (validFiles.length !== files.length) {
      toast({
        title: 'Invalid files',
        description: 'Only images and videos under 10MB are allowed',
        variant: 'destructive',
      });
    }
    setSelectedFiles((prev) => [...prev, ...validFiles].slice(0, 5)); // Max 5 files
  };

  const removeFile = (index: number) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  // Image submission handler
  const handleImageSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedFiles.length === 0) {
      toast({
        title: 'No photos selected',
        description: 'Please select at least one photo to upload',
        variant: 'destructive',
      });
      return;
    }
    setUploading(true);
    try {
      const fileUrls: string[] = [];
      for (const file of selectedFiles) {
        console.log('Processing file:', file.name, file.type, file.size);
        try {
          if (file && file.name && file.type) {
            const compressedFile = await compressFile(file);
            const path = `reviews/${Date.now()}-${Math.random().toString(36).substring(2)}-${file.name}`;
            const url = await uploadFile(compressedFile, path);
            fileUrls.push(url);
            console.log('Successfully uploaded:', file.name, 'URL:', url);
          } else {
            console.error('Invalid file object:', file);
            throw new Error(`Invalid file: ${file?.name || 'unnamed'}`);
          }
        } catch (fileError) {
          console.error('Error processing file:', file.name, fileError);
          try {
            const path = `reviews/${Date.now()}-${Math.random().toString(36).substring(2)}-${file.name}`;
            const url = await uploadFile(file, path);
            fileUrls.push(url);
            console.log('Successfully uploaded original file:', file.name);
          } catch (uploadError) {
            console.error('Failed to upload even original file:', file.name, uploadError);
            throw new Error(
              `Failed to upload ${file.name}: ${
                uploadError instanceof Error ? uploadError.message : 'Unknown error'
              }`
            );
          }
        }
      }
      if (fileUrls.length > 0) {
        await imageReviewMutation.mutateAsync({
          reviewText: 'Photo submission from customer',
          rating: 5,
          files: fileUrls,
        });
      } else {
        throw new Error('No files were successfully processed');
      }
    } catch (error) {
      console.error('Upload error:', error);
      toast({
        title: 'Upload failed',
        description:
          error instanceof Error
            ? error.message
            : 'Failed to upload files. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* SUCCESS MESSAGE - FULL WIDTH */}
        {showSuccess && (
          <div
            className="bg-green-600 text-white p-6 rounded-lg text-center"
            data-testid="success-message"
          >
            <CheckCircle className="inline-block w-6 h-6 mr-2" />
            <div className="space-y-3">
              <p className="font-semibold">Ready to leave your review!</p>
              <p className="text-sm">
                Click the button below to review All-Stars Motorsport on Trustpilot
              </p>
              <Button
                onClick={handleReviewClick}
                className="bg-white text-green-600 hover:bg-green-50 inline-flex items-center gap-2"
                data-testid="button-review-trustpilot"
              >
                <Star className="w-4 h-4" /> Review on Trustpilot{' '}
                <ExternalLink className="w-4 h-4" />
              </Button>
            </div>
          </div>
        )}

        {/* RESPONSIVE GRID: Side-by-side on desktop, stacked on mobile */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* TRUSTPILOT SECTION */}
          <Card className="shadow-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-2xl" data-testid="title-trustpilot">
                  Leave a Review
                </CardTitle>
                <Link href="/reviews" data-testid="link-view-reviews">
                  <Button variant="outline" size="sm">
                    <Eye className="w-4 h-4 mr-2" /> View Reviews
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* ✅ BOX VERTE TRUSTPILOT AVEC TEXTE VERT FONCÉ */}
              <div className="p-4 bg-[#04da8d]/20 rounded-lg border border-transparent">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0">
                    <img
                      src="https://www.socialbuzzing.co.uk/wp-content/uploads/2021/06/The-Importance-Of-Online-Reviews-And-What-Social-Buzzing-Trust-Pilot-Reviews-Mean-For-Our-Clients.png"
                      alt="Trustpilot"
                      className="w-25 h-12"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-[#005f41] mb-1">
                      Share your experience with All-Stars Motorsport
                    </h3>
                    <p className="text-xs text-[#005f41]/80">
                      Your review will be published on Trustpilot, helping other customers make
                      informed decisions. We value your honest feedback about our service.
                    </p>
                  </div>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="customerName" className="text-sm font-medium">
                    Your Name <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="customerName"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="Enter your full name"
                    className="w-full"
                    required
                    data-testid="input-customer-name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="customerEmail" className="text-sm font-medium">
                    Your Email <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="customerEmail"
                    type="email"
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="w-full"
                    required
                    data-testid="input-customer-email"
                  />
                  <p className="text-xs text-muted-foreground">
                    This will be used to verify your review on Trustpilot
                  </p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="referenceId" className="text-sm font-medium">
                    Order/Service Reference (Optional)
                  </Label>
                  <Input
                    id="referenceId"
                    value={referenceId}
                    onChange={(e) => setReferenceId(e.target.value)}
                    placeholder="e.g., Order #12345, Service booking reference"
                    className="w-full"
                    data-testid="input-reference-id"
                  />
                  <p className="text-xs text-muted-foreground">
                    Help us identify your specific service or order
                  </p>
                </div>

                {/* ✅ BOUTON TRUSTPILOT EN VERT */}
                <Button
                  type="submit"
                  className="w-full bg-[#04da8d] hover:bg-[#009a67] text-white"
                  disabled={submitMutation.isPending}
                  data-testid="button-submit-trustpilot"
                >
                  {submitMutation.isPending ? (
                    <>
                      <div className="w-4 h-4 mr-2 animate-spin rounded-full border-2 border-white border-t-transparent" />
                      Generating Review Link...
                    </>
                  ) : (
                    <>
                      <Star className="w-4 h-4 mr-2" /> Generate My Trustpilot Review Link
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* IMAGE SUBMISSION SECTION */}
          <div className="space-y-4">
            {showImageSuccess && (
              <div
                className="bg-green-600 text-white p-4 rounded-lg text-center"
                data-testid="image-success-message"
              >
                <CheckCircle className="inline-block w-5 h-5 mr-2" />
                <span>Your photos have been uploaded successfully!</span>
              </div>
            )}

            <Card className="shadow-sm">
              <CardHeader>
                <div className="flex-shrink-0 w-32 overflow-hidden">
                   <img
                    src="https://www.all-stars-motorsport.com/img/all-stars-motorsport-logo_invoice-1632499801.jpg"
                    alt="ASM"
                    className="w-full h-auto"/>
                </div>
                <CardTitle data-testid="title-image-review">Share Your Experience with Images</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Upload photos of your project or service experience
                </p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleImageSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="files" className="text-sm font-medium">
                      Upload Your Photos
                    </Label>
                    <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center">
                      <Upload className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                      <div className="space-y-2">
                        <p className="text-sm text-muted-foreground">
                          Upload images or videos (Max 5 files, 10MB each)
                        </p>
                        <Input
                          id="files"
                          type="file"
                          multiple
                          accept="image/*,video/*"
                          onChange={handleFileChange}
                          className="hidden"
                          data-testid="input-files"
                        />
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => document.getElementById('files')?.click()}
                          data-testid="button-select-files"
                        >
                          Select Files
                        </Button>
                      </div>
                    </div>

                    {selectedFiles.length > 0 && (
                      <div className="space-y-2">
                        <p className="text-sm font-medium">Selected Files:</p>
                        <div className="space-y-2">
                          {selectedFiles.map((file, index) => (
                            <div
                              key={index}
                              className="flex items-center justify-between bg-gray-50 dark:bg-gray-800 p-3 rounded-lg"
                              data-testid={`file-item-${index}`}
                            >
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded flex items-center justify-center">
                                  {file.type.startsWith('image/') ? '🖼️' : '🎥'}
                                </div>
                                <div>
                                  <p className="text-sm font-medium">{file.name}</p>
                                  <p className="text-xs text-muted-foreground">
                                    {(file.size / 1024 / 1024).toFixed(1)} MB
                                  </p>
                                </div>
                              </div>
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={() => removeFile(index)}
                                data-testid={`button-remove-file-${index}`}
                              >
                                <X className="w-4 h-4"/>
                              </Button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* ✅ BOUTON UPLOAD EN ROUGE */}
                  <Button
                    type="submit"
                    className="w-full bg-[red] hover:bg-[black] text-white"
                    disabled={uploading || imageReviewMutation.isPending || selectedFiles.length === 0}
                    data-testid="button-submit-image-review"
                  >
                    {uploading || imageReviewMutation.isPending ? (
                      <>
                        <div className="w-4 h-4 mr-2 animate-spin rounded-full border-2 border-white border-t-transparent" />
                        {uploading ? 'Uploading Photos...' : 'Submitting Photos...'}
                      </>
                    ) : (
                      <>
                        <Upload className="w-4 h-4 mr-2"/> Upload Photos
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* FLOATING SOCIAL BUTTON */}
        <div className="fixed bottom-6 right-6 z-50">
          {/* Social Links Panel */}
          <div
            className={`absolute bottom-16 right-0 bg-white dark:bg-gray-800 rounded-lg shadow-2xl border border-gray-200 dark:border-gray-700 p-4 transition-all duration-300 ${
              socialExpanded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
            }`}
            data-testid="social-panel"
          >
            <div className="flex flex-col gap-3 min-w-[200px]">
              <a
                href="https://www.facebook.com/allstarsmotorsport"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 bg-blue-50 dark:bg-blue-950 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900 transition-colors"
                data-testid="link-facebook"
              >
                <Facebook className="w-6 h-6 text-blue-600" />
                <span className="text-sm font-medium">Facebook</span>
              </a>
              <a
                href="https://www.instagram.com/allstarsmotorsport"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 bg-pink-50 dark:bg-pink-950 rounded-lg hover:bg-pink-100 dark:hover:bg-pink-900 transition-colors"
                data-testid="link-instagram"
              >
                <Instagram className="w-6 h-6 text-pink-600" />
                <span className="text-sm font-medium">Instagram</span>
              </a>
              <a
                href="https://wa.me/+33651871788"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-950 rounded-lg hover:bg-green-100 dark:hover:bg-green-900 transition-colors"
                data-testid="link-whatsapp"
              >
                <MessageCircle className="w-6 h-6 text-green-600" />
                <span className="text-sm font-medium">WhatsApp 🇫🇷</span>
              </a>
               <a
                href="https://wa.me/+34691161570"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-950 rounded-lg hover:bg-green-100 dark:hover:bg-green-900 transition-colors"
                data-testid="link-whatsapp"
              >
                <MessageCircle className="w-6 h-6 text-green-600" />
                <span className="text-sm font-medium">WhatsApp 🇪🇸</span>
              </a>
               <a
                href="https://wa.me/+351912201753"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-950 rounded-lg hover:bg-green-100 dark:hover:bg-green-900 transition-colors"
                data-testid="link-whatsapp"
              >
                <MessageCircle className="w-6 h-6 text-green-600" />
                <span className="text-sm font-medium">WhatsApp 🇬🇧</span>
              </a>
            </div>
          </div>

          {/* Toggle Button */}
          <button
            onClick={() => setSocialExpanded(!socialExpanded)}
            className="w-14 h-14 bg-[red] hover:bg-[black] text-white rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110"
            data-testid="button-social-toggle"
            aria-label="Social Media Links"
          >
            {socialExpanded ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
          </button>
        </div>
      </div>
    </div>
  );
}