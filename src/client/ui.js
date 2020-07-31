const MINIMIZE = "none",
      MAXIMIZE = "inline",
      NO_SPACE = '',
      CLICK_EVENT = 'click',
      chatbox_toggle = "btnMinimize",
      content_box = "contentBox",
      send_box = "sendBox",
      chat_lines = 'chatLines',
      NEW_MESSAGE = 'chat-message',
      header_badge = 'header_badge',
      chat_box_badge = 'chat_box_badge' ;

const $ = (id) => document.getElementById(id);

class ChatboxUI {
  constructor() {
    this._is_maximize = true;
  }

  _toggle_content() {
    $(content_box).style.display = (this._is_maximize) ? MINIMIZE : MAXIMIZE;
  }

  _toggle_send_input() {
    $(send_box).style.display    = (this._is_maximize) ? MINIMIZE : MAXIMIZE;
  }
  
  _toggle_state() {
    this._is_maximize = !this._is_maximize;
  }

  toggle() {
    this._toggle_content();
    this._toggle_send_input();
    this._toggle_state();
  }

  is_maximize() {
    return this._is_maximize;
  }
}

function render_one_line(message) {
  let node = document.createElement("p");
  node.className = "card-text";
  let textnode = document.createTextNode(message);
  node.appendChild(textnode);
  return node;
}

function render_chat_message({ message }) {
  document.getElementById(chat_lines).appendChild(render_one_line(message));
}

function render_unread_count_header({ unread_state }) {
  document.getElementById(header_badge).innerText = unread_state.get_string();
}

function render_unread_count_chatbox({ unread_state }) {
  document.getElementById(chat_box_badge).innerText = unread_state.get_string();
}

function reset_unread_notification_ui() {
  document.getElementById(header_badge).innerText = "";
  document.getElementById(chat_box_badge).innerText = "";
}