const btn = document.querySelector(".changeColorBtn");
const colorGrid = document.querySelector(".colorGrid");
const colorvalue = document.querySelector(".colorValue");

btn.addEventListener("click", async () => {

    // const color=chrome.storage.sync.get("color",({color})=>{
    //   console.log("color:",color );
    const msg=chrome.storage.sync.get("msg",({msg})=>{
      console.log("msg:",msg );
    })

    //to get the current tab
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript(
    {
      target: { tabId: tab.id },
      function: pickColor,
    },
    async (injectionResults) => {
      const [data] = injectionResults;
      if (data.result) {
        const color = data.result.sRGBHex;
        // console.log(data);
        colorGrid.style.backgroundColor = color;
        colorvalue.innerHTML = color;

        //to copy the color to the clipboard
        try {
            await navigator.clipboard.writeText(color);
            
        } catch (error) {
            console.log(error);
        }
      }
    }
  );
});
//eyeDropper Extension API
const pickColor = async () => {
  try {
    const eyeDropper = new EyeDropper();
    const selectedColor = await eyeDropper.open();
    //problem in the eyedropper API
    const selectedColorString = JSON.stringify(selectedColor);
    const newColorString = selectedColorString.replace(/,\s*0\)/, ", 1)");
    const newColor = JSON.parse(newColorString);
    //problem in the eyedropper API----
    console.log(newColor);
    return newColor;
  } catch (error) {}
};
