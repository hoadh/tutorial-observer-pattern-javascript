class UnreadState {
  constructor() {
    this.reset();
  }

  reset() {
    this.unread_count = 0;
  }

  increase() {
    this.unread_count++;
  }
  
  get() {
    return this.unread_count;
  }

  get_string() {
    return this.unread_count === 0 ? '' : this.unread_count;
  }
}
