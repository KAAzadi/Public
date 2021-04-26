using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System.Data;


//Citations: Primarily the .NET and Newtonsoft.Json documentation, with the use of a few examples from the Newtonsoft.Json documentation
namespace CryptoSentry
{
    public class Currency
    {
        public string Label { get; set; }
        public string Name { get; set; }
        public double Price { get; set; }
        public double Volume { get; set; }
    }
    class JsonWrapper   //Class created with help from the Newtonsoft.Json documentation
    {
        public List<Currency> GetContent(string preProcessed)
        {
            List<Currency> output = new List<Currency>();

            List<string> splitApart = SplitBulk(preProcessed);

            output = GetMarkets(splitApart, output);

            return output;
        }

        private List<string> SplitBulk(string preProcessed)
        {
            List<string> output = new List<string>();

            preProcessed = preProcessed.Replace("{\"Markets\":[[{", "{");
            preProcessed = preProcessed.Replace("}]]}", "}");
            preProcessed = preProcessed.Replace("},{", "}SplitHere{");

            output = preProcessed.Split("SplitHere").ToList<string>();

            return output;
        }

        private List<Currency> GetMarkets(List<string> splitApart,List<Currency> output)
        {
            foreach (string crypto in splitApart)
            {
                Currency currency = JsonConvert.DeserializeObject<Currency>(crypto);
                output.Add(currency);
            }

            return output;
        }
    }
}
