export type Dispatch<T, P = {}> = {
  type: T;
  payload?: P;
};

export type ChangeSelectEvent = React.ChangeEvent<HTMLSelectElement>;

export type ChangeInputEvent = React.ChangeEvent<HTMLInputElement>;
export type ChangeTextAreaEvent = React.ChangeEvent<HTMLTextAreaElement>;

export type DateOfBirth = {
  year?: number;
  month?: string | number;
  day?: number;
};

export type CustomError<T> = {
  errorData?: T;
} & Error;