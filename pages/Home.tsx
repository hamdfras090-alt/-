import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FileText, Download, Eye, ChevronLeft } from 'lucide-react';
import { Button } from '../components/Button';
import { AdPlaceholder } from '../components/AdPlaceholder';
import { ACCOUTING_MATERIAL, BLANK_PDF } from '../types';

export const Home: React.FC = () => {
  const navigate = useNavigate();

  const handleDownload = (e: React.MouseEvent) => {
    // In a real scenario, this would trigger a file download
    e.stopPropagation();
    // Simulate link click for PDF
    const link = document.createElement('a');
    link.href = BLANK_PDF;
    link.download = ACCOUTING_MATERIAL.fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-l from-primary to-blue-700 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://picsum.photos/1920/1080?blur=10')] opacity-10 bg-cover bg-center" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10 text-center md:text-right">
          <div className="md:w-2/3">
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight">
              ملخصات جامعية مجانية <br/> تحميل مباشر
            </h1>
            <p className="text-lg md:text-xl text-blue-100 mb-8 max-w-2xl">
              تحميل ملخص مادة "محاسبة 1" بصيغة PDF — مجاني بالكامل. مصمم خصيصاً لمساعدتك في الامتحانات.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                variant="accent" 
                size="lg"
                onClick={() => navigate('/mohasaba-1')}
                className="bg-accent text-white hover:bg-amber-600 gap-2 font-bold"
              >
                تحميل ملخص محاسبة 1 الآن
                <ChevronLeft size={20} />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Ad Placeholder */}
        <AdPlaceholder location="banner" />

        {/* Material Section */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 border-r-4 border-primary pr-3">
            أحدث الملخصات المضافة
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Accounting 1 Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300 overflow-hidden group">
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <FileText className="text-primary h-8 w-8" />
                  </div>
                  <span className="bg-green-100 text-green-800 text-xs font-bold px-2 py-1 rounded-full">
                    مجاني
                  </span>
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors">
                  <Link to={`/${ACCOUTING_MATERIAL.slug}`}>{ACCOUTING_MATERIAL.title}</Link>
                </h3>
                
                <p className="text-gray-600 text-sm mb-4 leading-relaxed line-clamp-3">
                  {ACCOUTING_MATERIAL.description}
                </p>

                <div className="flex items-center gap-4 text-xs text-gray-500 mb-6">
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-gray-300"></span>
                    PDF
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-gray-300"></span>
                    {ACCOUTING_MATERIAL.fileSize}
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-gray-300"></span>
                    {ACCOUTING_MATERIAL.pageCount} صفحات
                  </span>
                </div>

                <div className="flex flex-col gap-2">
                  <Button onClick={handleDownload} fullWidth className="gap-2 justify-center">
                    <Download size={18} />
                    تنزيل الملخص (PDF)
                  </Button>
                  <Link to={`/${ACCOUTING_MATERIAL.slug}`} className="w-full">
                     <Button variant="secondary" fullWidth className="gap-2 justify-center bg-gray-100 text-gray-700 hover:bg-gray-200 border-none">
                      <Eye size={18} />
                      عرض التفاصيل
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};