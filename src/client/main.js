const chat_server_url = 'http://localhost:5000';
const chatbox_ui      = new ChatboxUI();
const unread_state    = new UnreadState();
const message_receiver = new Subject();

const chatbox_content_observer        = new Observer(render_chat_message);
const chatbox_unread_notify_observer  = new Observer(render_unread_count_chatbox);
const header_unread_notify_observer   = new Observer(render_unread_count_header);

message_receiver.subscribe(chatbox_content_observer);

function hide_unread_notification() {
  message_receiver.unsubscribe(chatbox_unread_notify_observer);
  message_receiver.unsubscribe(header_unread_notify_observer);
}

function show_unread_notification() {
  message_receiver.subscribe(chatbox_unread_notify_observer);
  message_receiver.subscribe(header_unread_notify_observer);
}

const socket = io(chat_server_url);
socket.on(NEW_MESSAGE, (message) => {
  unread_state.increase();
  message_receiver.notify({ message, unread_state});
});

document.getElementById(chatbox_toggle).addEventListener('click', _ => {
  chatbox_ui.toggle();
  unread_state.reset();
  if (chatbox_ui.is_maximize()) {
    hide_unread_notification();
    reset_unread_notification_ui();
  } else {
    show_unread_notification();
  }
});
