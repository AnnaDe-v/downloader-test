const config = {
  read: ["sample@email.com", "mark@fb.com", "whoami@dot.com", "test@email.com"],
  write: ["sample@email.com", "test@email.com"],
};

const checkEmailFuncByEmail = (willCheckedEmail) => (email) =>
  email === willCheckedEmail;

const getIsRead = (read, willCheckedEmail) =>
  read.some(checkEmailFuncByEmail(willCheckedEmail));
const getIsWrite = (write, willCheckedEmail) =>
  write.some(checkEmailFuncByEmail(willCheckedEmail));


const checkEmailByConfigByEmail = (config, willCheckedEmail) => {
  const { read, write } = config;
  const isRead = getIsRead(read, willCheckedEmail);
  const isWrite = getIsWrite(write, willCheckedEmail);
  if (isRead && isWrite) return "You can read and write";
  else if (isRead) return "You can read";
  else if (isWrite) return "You can write";
  else return "You don't have permission to perform read or write";
};


console.log(checkEmailByConfigByEmail(config, "sample@email.com"));