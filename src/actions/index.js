export function addMessageToContainer(message){
  const timeStamp = new Date().toString();
  const id = message + timeStamp;
  const messageObject = { message, id}
  return {type: 'ADD_MESSAGE', payload: messageObject};
}

export function clearMessage(id){
  return {type: 'CLEAR_MESSAGE', payload: id};
}