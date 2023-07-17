// import { addPage }  from './printHtml'

(async () => {
  try {
    const pagesApi = await fetch(`http://localhost:58513/pages/`);
    const pagesData = await pagesApi.json();

    if (Object.keys(pagesData).length === 0) {
      throw new Error("No data found");
    }

    addPage(pagesData);
  } catch (error) {
    throw new Error(`An error: ${error}`);
  }
})();