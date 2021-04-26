using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Net.Http.Json;
using System.Windows.Forms;

//Citations: Primarily the .NET documentation, with the use of a few examples from stackoverflow, c-sharpcorner, and .NET documentation
namespace CryptoSentry
{
    class HttpClientWrapper
    {
        static async Task<string> VerifySiteIsReady(string urlToUse, HttpClient client)
        {
            HttpResponseMessage response = new HttpResponseMessage();

            response = await client.GetAsync(urlToUse);

            string content = String.Empty;

            if(response.IsSuccessStatusCode)
            {
                content = response.StatusCode.ToString();
            }
            else
            {
                MessageBox.Show("Unable to access url");
            }

            return content;
        }
        
        //This method acts as the main method of the class, calling other functions to ultimately return the final string
        public async Task<string> GetContent(string url, string key, string content, HttpClient client)
        {
            var ready = await VerifySiteIsReady(url, client);
            
            if(ready == "OK")
            {
                var results = GetAPI(key, client);

                content = results.Result;
            }
            else
            {
                content = "Unable to access";
            }
            
            return content;
        }

        private async Task<string> GetAPI(string url, HttpClient client)
        {
            var content = client.GetStringAsync(url);

            return content.Result;
        }        
    }
}
