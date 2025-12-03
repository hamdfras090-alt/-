import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer id="contact" className="bg-gray-800 text-white pt-12 pb-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Brand & Contact */}
          <div>
            <h3 className="text-xl font-bold mb-4">ملخصاتي</h3>
            <p className="text-gray-300 mb-4 text-sm leading-relaxed">
              منصة طلابية تهدف لتوفير ملخصات دراسية عالية الجودة ومجانية لمساعدة الطلاب على التفوق.
            </p>
            <div className="flex flex-col gap-2 text-sm text-gray-300">
              <a href="https://wa.me/218XXXXXXXXX" className="flex items-center gap-2 hover:text-white">
                <Phone size={16} />
                <span>واتساب: +218XXXXXXXXX</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4">روابط سريعة</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><Link to="/" className="hover:text-white transition-colors">الرئيسية</Link></li>
              <li><Link to="/mohasaba-1" className="hover:text-white transition-colors">ملخص محاسبة 1</Link></li>
              <li><Link to="/about" className="hover:text-white transition-colors">من نحن</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-lg font-bold mb-4">قانوني</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><Link to="/privacy" className="hover:text-white transition-colors">سياسة الخصوصية</Link></li>
              <li><Link to="/terms" className="hover:text-white transition-colors">شروط الاستخدام</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>© {new Date().getFullYear()} ملخصاتي — جميع الحقوق محفوظة.</p>
        </div>
      </div>
    </footer>
  );
};