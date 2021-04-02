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

namespace CryptoSentry
{
    public partial class Form1 : Form
    {
        public Form1()
        {
            InitializeComponent();
        }

        private async void button1_Click(object sender, EventArgs e)
        {
            string urlKey = "https://www.worldcoinindex.com/apiservice/v2getmarkets?key=l3wvcoYjLTImrrJsi8vZccjmfaGVDyR44bh&fiat=usd";
            string url = "https://www.worldcoinindex.com";

            var check = new CryptoFacade();

            var preJson = await check.CallClientWrapper(url, urlKey);
        }
    }
}
