class Form<T extends { [key: string]: any }> {
  public data: T;

  constructor(data: T) {
    this.data = data;
  }

  get getData() {
    const form = new FormData();
    for (let key in this.data) {
      form.append(key, this.data[key]);
    }
    return form;
  }
}

export default Form;
