using System;
using System.Net;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Net.Mail;

//Class made with help from stackoverflow and .NET documentation
namespace CryptoSentry
{
    class SMSWrapper
    {
        SmtpClient client = new SmtpClient("smtp.gmail.com")
        {
            UseDefaultCredentials = false,
            Port = 587,
            Credentials = new NetworkCredential("kian.a.azadi1@gmail.com", "Brav3H3art"),
            EnableSsl = true,
        };
        MailMessage email = new MailMessage();
        
        public void Compare(List<Monitored> watchedCurrencies, string address)
        {
            email.To.Add(address);
            email.From = new MailAddress("kian.a.azadi@hotmail.com");


            foreach (Monitored currency in watchedCurrencies)
            {
                if (currency.crypto.Price < currency.minimumValue)
                {
                    BelowMin(currency);
                }
                else if (currency.crypto.Price > currency.maximumValue)
                {
                    AboveMax(currency);
                }
            }

            return;
        }

        private void BelowMin(Monitored currency)
        {
            email.Subject = currency.crypto.Name + " is below your minimum of " + currency.minimumValue.ToString();

            client.Send(email);

            return;
        }

        private void AboveMax(Monitored currency)
        {
            email.Subject = currency.crypto.Name + " is above your maximum of " + currency.maximumValue.ToString();

            client.Send(email);

            return;
        }
    }
}
