using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ChatBox.Models
{
    public class ChatModel
    {
        public string Message { get; set; }
        public string From { get; set; }
        public string To { get; set; }
    }
}