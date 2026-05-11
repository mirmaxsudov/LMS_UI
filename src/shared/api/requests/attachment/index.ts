import { api } from '@/shared/api';

interface PostAttachmentRequest {
  file: File;
  params: {
    type: AttachmentType;
  };
}

export const postAttachment = ({ file, params }: PostAttachmentRequest) => {
  const formData = new FormData();
  formData.append('file', file);
  return api.post<AttachmentResponse>('/attachments', formData, {
    params,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
};

interface PostAttachmentBulkRequest {
  files: File[];
  params: {
    type: AttachmentType;
  };
}

export const postAttachmentBulk = ({ files, params }: PostAttachmentBulkRequest) => {
  const formData = new FormData();
  files.forEach((file) => formData.append('files', file));
  return api.post<AttachmentsResponse>('/attachments/bulk', formData, {
    params,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
};

interface DeleteAttachmentRequest {
  id: string;
}

export const deleteAttachment = ({ id }: DeleteAttachmentRequest) =>
  api.delete(`/attachments/${id}`);
