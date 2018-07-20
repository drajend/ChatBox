using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.AspNet.SignalR;
using ChatBox.Models;
using System.Web.Script.Serialization;

namespace ChatBox
{
    public class ChatHub : Hub
    {
        Dictionary<string, string> AllClients = new Dictionary<string, string>();
        public void SendMessage(string strMessage)
        {
            var _Msg = new JavaScriptSerializer().Deserialize<ChatModel>(strMessage);
            Clients.All.Announce(strMessage);
           // Clients.Client(AllClients[_Msg.To]).Announce(strMessage);
        }

        public void Connect(string strUser)
        {
            AllClients.Add(strUser, Context.ConnectionId);
            Clients.All.Announce(strUser + " Connected");
        }
    }
}