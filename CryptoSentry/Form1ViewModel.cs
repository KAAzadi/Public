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
    public class Names
    {
        public string Name { get; set; }
    }
    class Form1ViewModel
    {
        
    }
    //Call the WCI rest API
    //initialize API to get list of top 100 cryptos
    //Can separate by "}," and then can isolate using "label"
    //put list into list box for user to select from
    //Allow for people to input their own api key

    //Create an interface to allow for selection of desired crypto, and add their names to a list
    //This list allows for breakdown of the API once it's called (once every minute to be under the 70/hr limit)
    //Ask them for a minimum and maximum value to be notified about, and a place to enter a phone number for SMS

    //After everything is set up, monitor the API once every 5 minutes for each crypto in the list
    //receive the API and load into a location

    //for(item in list){
    //parse the API ticker for value of interest

    //if value < min
    //text = "value is below min"
    //else if value > max
    //text = "value is above max"

    //after the check for min/max, send the text message to the number
    //done via SMS library
    //}
}
