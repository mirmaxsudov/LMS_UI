type AttachmentType = 'AUDIO' | 'DOCUMENT' | 'FILE' | 'IMAGE' | 'OTHER' | 'VIDEO';

interface Attachment {
  checksum: string;
  contentType: string;
  createdAt: string;
  extension: string;
  id: string;
  originalName: string;
  path: string;
  size: number;
  storedName: string;
  type: AttachmentType;
  uploadedById: string;
  url: string;
}

type AttachmentResponse = ApiResponse<Attachment>;
type AttachmentsResponse = ApiResponse<Attachment[]>;
