import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, Phone, MapPin, MessageSquare, Calendar, Clock } from 'lucide-react';
import { openBookingSystem } from '@/lib/booking';
import { useTranslation } from 'react-i18next';
export const Contact = () => {
  const {
    t
  } = useTranslation();
  return <section id="contact" className="py-14 md:py-20 bg-background overflow-x-hidden overflow-y-visible">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl gradient-heading mb-6 px-2">
            {t('homeContact.getIn')} <span className="gradient-text">{t('homeContact.touch')}</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {t('homeContact.readyToTransform')}
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Schedule Consultation */}
          <Card>
            <CardHeader>
              <CardTitle className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-3 text-center">
                <div className="bg-green-800 rounded-full p-2 mx-0 px-[13px] py-[16px]">
                  <Calendar className="w-5 h-5 text-white mx-[3px] py-px px-0 my-[2px]" />
                </div>
                <span className="sm:text-lg tracking-wide font-bold text-xl py-0">
                  {t('homeContact.scheduleConsultation').split(' ').map((word, index) => word.toLowerCase().includes('consultation') ? <span key={index} className="gradient-text tracking-wider font-bold"> {word}</span> : <span key={index}> {word}</span>)}
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-6">
              <p className="text-muted-foreground py-0 my-0 mx-0 px-0">
                {t('homeContact.bookConsultation')}
              </p>
              
              {/* Consultation Booking */}
              <div className="bg-muted/30 rounded-lg p-6 flex items-center justify-center">
                <div className="text-center space-y-4">
                  <div className="bg-green-800 rounded-full p-3 w-fit mx-auto px-[6px] py-[3px]">
                    <Calendar className="w-12 h-12 text-white my-0 py-[7px]" />
                  </div>
                  <h3 className="text-lg gradient-heading">{t('homeContact.bookYourConsultation')}</h3>
                  <p className="text-muted-foreground text-base max-w-md">
                    {t('homeContact.scheduleWithExperts')}
                  </p>
                  <Button variant="gradient" size="default" className="mt-4" onClick={openBookingSystem}>
                    <Calendar className="w-4 h-4 mr-2" />
                    {t('homeContact.scheduleConsultationButton')}
                  </Button>
                </div>
              </div>

              {/* Business Hours */}
              <div className="bg-muted/20 rounded-lg p-4">
                <h4 className="text-sm font-semibold text-center mb-3 flex items-center justify-center space-x-3">
                  <div className="bg-green-800 rounded-full p-1">
                    <Clock className="w-4 h-4 text-white" />
                  </div>
                  <span>{t('homeContact.businessHours')}</span>
                </h4>
                <div className="text-center space-y-1 text-sm text-muted-foreground">
                  <div>{t('homeContact.mondayFriday')}</div>
                  <div>{t('homeContact.weekendClosed')}</div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="outline" onClick={() => {
                  const message = `${t('common.whatsappMessage.greeting')}\n\n${t('common.whatsappMessage.services')}\n\n${t('common.whatsappMessage.closing')}`;
                  window.open(`https://wa.me/240222108272?text=${encodeURIComponent(message)}`, '_blank');
                }}>
                  <div className="bg-green-800 rounded-full p-1 mr-2">
                    <MessageSquare className="w-4 h-4 text-white" />
                  </div>
                  {t('homeContact.whatsappUs')}
                </Button>
                <Button variant="outline" onClick={() => window.open('mailto:andeda1@outlook.com', '_blank')}>
                  <div className="bg-green-800 rounded-full p-1 mr-2">
                    <Mail className="w-4 h-4 text-white" />
                  </div>
                  {t('homeContact.emailUs')}
                </Button>
              </div>

              <div className="text-center text-base text-muted-foreground">
                {t('homeContact.preferImmediate')}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>;
};