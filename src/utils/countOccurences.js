import _ from "lodash";

const CUSTOMERS_PER_PAGE = 20;

export const groupPerCharNumber = (arr, startingChars) => {
   let data = _.entries(_.groupBy(arr, (x) => x.psc.slice(0, startingChars)));
   data = data.flatMap((item) => {
      if (item[1].length > 0.2 * CUSTOMERS_PER_PAGE) {
         return [
            ..._.entries(
               _.groupBy(item[1], (x) => x.psc.slice(0, startingChars + 1))
            ),
         ];
      } else {
         return [item];
      }
   });
   data = data.flatMap((item) => {
      if (item[1].length > 0.2 * CUSTOMERS_PER_PAGE) {
         return [
            ..._.entries(
               _.groupBy(item[1], (x) => x.psc.slice(0, startingChars + 2))
            ),
         ];
      } else {
         return [item];
      }
   });
   return data;
};

const createChosenGroup = (entriesGroupedData, numberOfGroups) => {
   let other = ["other", []];
   for (let x of entriesGroupedData.slice(numberOfGroups)) {
      other[1].push([...x[1]]);
   }
   return entriesGroupedData.slice(0, numberOfGroups).concat([other]);
};
export const getGroupedPageData = (arr, startingChars) => {
   let chosenGrouping = groupPerCharNumber(arr, startingChars);
   let totalNumberOfGroups = chosenGrouping.length;
   let groupsWithMoreThanOne = chosenGrouping.filter(
      (x) => x[1].length > 1
   ).length;
   chosenGrouping = _.orderBy(chosenGrouping, (x) => x[1].length, ["desc"]);
   const numberOfGroups = groupsWithMoreThanOne > 9 ? 9 : groupsWithMoreThanOne;
   return createChosenGroup(chosenGrouping, numberOfGroups);
};
