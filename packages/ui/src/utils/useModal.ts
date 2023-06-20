export function useModal(id: string){
  const checkBox = document.getElementById(id) as HTMLInputElement;
  if(checkBox){
    checkBox.checked = !checkBox.checked;
  }
}