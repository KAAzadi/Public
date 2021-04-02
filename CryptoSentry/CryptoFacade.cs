using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Net.Http.Json;

namespace CryptoSentry
{
    class CryptoFacade
    {
        HttpClient client;
        
        public async Task<string> CallClientWrapper(string url, string key)
        {
            bool worked = false;

            client = new HttpClient();

            var wrapper = new HttpClientWrapper();

            string content = string.Empty;

            content = await wrapper.GetContent(url, key, content, client);

            return content;
        }
    }
}
