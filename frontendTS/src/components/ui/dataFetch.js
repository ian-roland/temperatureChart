const URL = "http://192.168.15.186:3334/temperature_and_datetime";

async function dataScript() {
  const resp = await fetch(URL);

  if (resp.status === 200) {
    const obj = await resp.json();

    console.log(obj);
  }
}

dataScript();
