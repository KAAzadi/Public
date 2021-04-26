using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Net.Http.Json;
using System.Timers;


//Citations: Facade made with inspiration from "Design Patterns" by Gamma et al
namespace CryptoSentry
{
    public class Monitored
    {
        public Currency crypto { get; set; }
        public double minimumValue { get; set; }
        public double maximumValue { get; set; }
    }
    class CryptoFacade
    {
        HttpClient client;
        
        public async Task<string> CallClientWrapper(string url, string key)
        {
            client = new HttpClient();

            var wrapper = new HttpClientWrapper();

            string content = string.Empty;

            content = await wrapper.GetContent(url, key, content, client);

            return content;
        }

        public List<Currency> CallJsonWrapper(string preProcessed)
        {
            var wrapper = new JsonWrapper();

            List<Currency> currencies = new List<Currency>();

            currencies = wrapper.GetContent(preProcessed);

            return currencies;
        }
        public void CallSMSWrapper(List<Monitored> watchedCurrencies, string emailAddress)
        {
            var wrapper = new SMSWrapper();

            wrapper.Compare(watchedCurrencies, emailAddress);

            return;
        }
    }
}
