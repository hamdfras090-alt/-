export interface Material {
  id: string;
  title: string;
  slug: string;
  description: string;
  fullDescription: string;
  imageAlt: string;
  fileSize: string;
  pageCount: number;
  fileName: string;
  topics: string[];
}

export const BLANK_PDF = "data:application/pdf;base64,JVBERi0xLjcKCjEgMCBvYmogDwovUGFnZXMgMiAwIFIKPj4KZW5kb2JqCjIgMCBvYmogDwovS2lkcyBbMyAwIFJdCi9Db3VudCAxCj4+CmVuZG9iagozIDAgb2JqIAwKL1BhcmVudCAyIDAgUgovTWVkaWFCb3ggWzAgMCA1OTUgODQyXQovUmVzb3VyY2VzIDw8Pj4KL0NvbnRlbnRzIDQgMCBSCj4+CmVuZG9iago0IDAgb2JqIAwKL0xlbmd0aCAwCj4+CnN0cmVhbQplbmRzdHJlYW0KZW5kb2JqCnhyZWYKMCA1CjAwMDAwMDAwMDAgNjU1MzUgZiAKMDAwMDAwMDAxMCAwMDAwMCBuIAowMDAwMDAwMDYwIDAwMDAwIG4gCjAwMDAwMDAxMTEgMDAwMDAgbiAKMDAwMDAwMDIxMyAwMDAwMCBuIAp0cmFpbGVyCjw8Ci9TaXplIDUKL1Jvb3QgMSAwIFIKPj4Kc3RhcnR4cmVmCjI2MgolJUVPRgo=";

export const ACCOUTING_MATERIAL: Material = {
  id: 'mohasaba-1',
  title: 'محاسبة 1',
  slug: 'mohasaba-1',
  description: 'ملخص منظّم لمادة محاسبة 1 يغطي: أساسيات القوائم المالية، قيود اليومية، دفتر الأستاذ، المعادلة المحاسبية، مع أمثلة محلولة.',
  fullDescription: 'ملخص موجز ومبسط للمادة مع أمثلة محلولة، مثالي للمراجعة قبل الامتحانات.',
  imageAlt: 'ملخص محاسبة 1',
  fileSize: '300 KB',
  pageCount: 4,
  fileName: 'Mohasaba1_Molakhas.pdf',
  topics: [
    'تعريف المحاسبة والمعادلة المحاسبية',
    'قيود اليومية',
    'دفتر الأستاذ',
    'إعداد القوائم المالية البسيطة'
  ]
};