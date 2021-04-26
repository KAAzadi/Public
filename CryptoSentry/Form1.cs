using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Net.Http.Json;
using Newtonsoft.Json;
using System.Timers;


//Citations: Primarily the .NET documentation, with the use of a few examples as inspiration for the Timer.
namespace CryptoSentry
{
    public partial class CryptoSentry : Form
    {
        private List<Currency> currencies;
        private List<Monitored> watchedCurrencies = new List<Monitored>();
        private static System.Timers.Timer timer = new System.Timers.Timer();

        private string emailAddress;
        
        private IDictionary<string,Currency> allCurrencies = new Dictionary<string, Currency>();

        public CryptoSentry()
        {
            InitializeComponent();
            string[] carriers = { "AT&T", "Verizon", "Sprint", "TMobile", "Virgin" };
            foreach (string company in carriers)
            {
                this.Carrier.Items.Add(company);
            }
        }

        private async void CallButton_Click(object sender, EventArgs e)
        {
            string urlKey = "https://www.worldcoinindex.com/apiservice/v2getmarkets?key=l3wvcoYjLTImrrJsi8vZccjmfaGVDyR44bh&fiat=usd";
            string url = "https://www.worldcoinindex.com";           

            var check = new CryptoFacade();

            var preJson = await check.CallClientWrapper(url, urlKey);

            currencies = check.CallJsonWrapper(preJson);

            foreach (Currency currency in currencies)
            {
                if (allCurrencies.ContainsKey(currency.Name))
                {
                    allCurrencies[currency.Name] = currency;
                }
                else
                {
                    allCurrencies.Add(currency.Name, currency);

                    CurrencyList.Items.Add(currency.Name);
                }
            }

            //This next step is for SentryStart after the timer is enabled
            if (timer.Enabled)
            {
                foreach(Monitored currency in watchedCurrencies)
                {
                    currency.crypto = allCurrencies[currency.crypto.Name];
                }

                check.CallSMSWrapper(watchedCurrencies, emailAddress);
            }
        }

        private void CurrencyList_SelectedIndexChanged(object sender, EventArgs e)
        {
            var currency = allCurrencies[CurrencyList.SelectedItem.ToString()];

            LabelText.Text = currency.Label;
            VolumeText.Text = currency.Volume.ToString();
            PriceText.Text = currency.Price.ToString();
        }

        private void ExitButton_Click(object sender, EventArgs e)
        {
            this.Close();
        }

        private void MonitorButton_Click(object sender, EventArgs e)
        {
            var currency = allCurrencies[CurrencyList.SelectedItem.ToString()];
            var newCrypto = new Monitored();
            var found = false;
            newCrypto.crypto = currency;
            newCrypto.maximumValue = Convert.ToDouble(Maximum.Text);
            newCrypto.minimumValue = Convert.ToDouble(Minimum.Text);
            
            foreach(Monitored watched in watchedCurrencies)
            {
                if(watched.crypto == newCrypto.crypto)  //updates values of existing watched crypto
                {
                    watched.maximumValue = newCrypto.maximumValue;
                    watched.minimumValue = newCrypto.minimumValue;
                    found = true;
                    break;
                }
            }

            if (found == false)   //if a new crypto to be added to list, adds to list and to combobox
            {
                watchedCurrencies.Add(newCrypto);
                MonitorBox.Items.Add(newCrypto.crypto.Name);
            }
        }

        private void SentryStart_Click(object sender, EventArgs e)
        {
            string phoneService = Carrier.SelectedItem.ToString();

            timer.Interval = 300000;
            timer.Enabled = true;

            emailAddress = PhoneNumber.Text;

            if (phoneService == "AT&T")
            {
                emailAddress += "@txt.att.net";
            }
            else if (phoneService == "Verizon")
            {
                emailAddress += "@vtext.com";
            }
            else if (phoneService == "Sprint")
            {
                emailAddress += "@messaging.sprintpcs.com";
            }
            else if (phoneService == "TMobile")
            {
                emailAddress += "@tmomail.net";
            }
            else if (phoneService == "Virgin")
            {
                emailAddress += "@vmobl.com";
            }

            timer.Elapsed += CallButton_Click;    //Connects event to timer
        }

        private void SentryStop_Click(object sender, EventArgs e)
        {
            timer.Enabled = false;
        }

        
    }
}
