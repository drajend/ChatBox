using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.AspNet.SignalR;

namespace ChatBox
{
    public class ChatHub : Hub
    {
        Dictionary<string, string> AllClients = new Dictionary<string, string>();
        public void SendMessage(string Msg)
        {
            Clients.All.Announce(Msg);
        }

        public void Connect(string strUser)
        {
            AllClients.Add(strUser, Context.ConnectionId);
            Clients.All.Announce(strUser + " Connected");
        }
    }
}