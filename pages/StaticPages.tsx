import React from 'react';
import { Phone } from 'lucide-react';

export const About: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold mb-6 text-gray-900">من نحن</h1>
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 prose prose-lg">
        <p className="text-lg text-gray-700 leading-relaxed mb-6">
          أهلاً بك في موقع <strong>ملخصاتي</strong>.
        </p>
        <p className="text-gray-700 leading-relaxed mb-6">
          نحن مجموعة من الطلاب الجامعيين نسعى لتسهيل الرحلة الدراسية لزملائنا. لاحظنا صعوبة الحصول على ملخصات منظمة وواضحة لبعض المواد الأساسية، فقررنا إنشاء هذا الموقع ليكون مكتبة مجانية للملخصات.
        </p>
        <p className="text-gray-700 leading-relaxed mb-6">
          بدأنا بمادة المحاسبة 1 وسنقوم بإضافة المزيد من المواد قريباً بإذن الله. هدفنا هو نشر المعرفة ومساعدة الجميع على النجاح.
        </p>
        <div className="bg-blue-50 p-6 rounded-xl mt-8">
          <h3 className="font-bold text-blue-900 mb-2">تواصل معنا</h3>
          <p className="text-blue-800 mb-4">لديك ملخص تريد نشره؟ أو اقتراح لتطوير الموقع؟</p>
          <a href="https://wa.me/218XXXXXXXXX" className="inline-flex items-center gap-2 text-primary font-bold hover:underline">
            <Phone size={18} />
            تواصل عبر واتساب
          </a>
        </div>
      </div>
    </div>
  );
};

export const Privacy: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold mb-6 text-gray-900">سياسة الخصوصية</h1>
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
        <p className="mb-4">تاريخ التحديث: {new Date().toLocaleDateString('ar-EG')}</p>
        <p className="mb-4">في ملخصاتي، نولي خصوصيتك أهمية بالغة. هذه الوثيقة تشرح باختصار المعلومات التي قد نجمعها وكيف نستخدمها.</p>
        
        <h3 className="text-xl font-bold mt-6 mb-3">1. المعلومات التي نجمعها</h3>
        <p className="mb-4 text-gray-700">نحن لا نطلب منك تسجيل الدخول لتحميل الملفات. قد نستخدم ملفات تعريف الارتباط (Cookies) لتحسين تجربة المستخدم وتحليل عدد الزيارات (عبر Google Analytics مستقبلاً).</p>
        
        <h3 className="text-xl font-bold mt-6 mb-3">2. الإعلانات</h3>
        <p className="mb-4 text-gray-700">قد نعرض إعلانات من طرف ثالث (مثل AdSense) أو إعلانات محلية. هذه الأطراف قد تجمع معلومات مجهولة المصدر لتقديم إعلانات تناسب اهتماماتك.</p>
        
        <h3 className="text-xl font-bold mt-6 mb-3">3. أمان الملفات</h3>
        <p className="mb-4 text-gray-700">جميع الملفات المرفوعة تم فحصها للتأكد من خلوها من البرمجيات الضارة.</p>
      </div>
    </div>
  );
};

export const Terms: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold mb-6 text-gray-900">شروط الاستخدام</h1>
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
        <ul className="list-disc list-inside space-y-4 text-gray-700">
          <li><strong>الاستخدام الشخصي:</strong> الملخصات المتوفرة مخصصة للاستخدام الشخصي والمذاكرة فقط.</li>
          <li><strong>حقوق الملكية:</strong> نحترم حقوق الملكية الفكرية. إذا كنت صاحب محتوى وترى أنه منشور دون إذن، يرجى التواصل معنا لإزالته فوراً.</li>
          <li><strong>إعادة البيع:</strong> يمنع بيع هذه الملخصات أو التربح منها مادياً دون إذن مسبق. المحتوى هنا مجاني 100%.</li>
          <li><strong>إخلاء المسؤولية:</strong> الملخصات هي مجهود بشري قابل للخطأ والصواب. نوصي دائماً بالرجوع للمصادر الجامعية الرسمية (الكتاب والمحاضرات) كمرجع أساسي.</li>
        </ul>
      </div>
    </div>
  );
};