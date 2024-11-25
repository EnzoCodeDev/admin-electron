import { message } from "antd";
const style = {
  marginTop: "10vh",
};
export const messagesInfo = {
  error: (msg, duration = 1, key = 1) => {
    message.error({
      content: msg,
      duration: duration,
      className: "custom-class",
      style: style,
      key: key,
    });
  },
  success: (msg, duration = 1, key = 1) => {
    message.success({
      content: msg,
      duration: duration,
      className: "custom-class",
      style: style,
      key: key,
    });
  },
  warning: (msg, duration = 1, key = 1) => {
    message.warning({
      content: msg,
      duration: duration,
      className: "custom-class",
      style: style,
      key: key,
    });
  },
  info: (msg, duration = 1, key = 1) => {
    message.info({
      content: msg,
      duration: duration,
      className: "custom-class",
      style: style,
      key: key,
    });
  },
  loading: (msg, duration = 1, key = 1) => {
    message.loading({
      content: msg,
      duration: duration,
      className: "custom-class",
      style: style,
      key: key,
    });
  },
};
