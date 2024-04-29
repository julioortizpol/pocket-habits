import axios from "axios";
import { useEffect, useState } from "react";
import { removeEmptyFromArray } from "../clearEmpty";

export const useGetSheetsData = () => {
  const [allSeriesData, setAllSeriesData] = useState([]);
  function getAllSeries() {
    const SHEET_ID = process.env.EXPO_PUBLIC_SHEET_ID;;
    const SHEET_NAME = process.env.EXPO_PUBLIC_SHEET_NAME;
    const API_KEY = process.env.EXPO_PUBLIC_API_KEY;
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${SHEET_NAME}?valueRenderOption=FORMATTED_VALUE&key=${API_KEY}`;

    axios
      .get(url)
      .then(function (response) {
        console.log(response);
        // handle success
        formatResponse(response.data);
      })
      .catch(function (error) {
        // handle error
        onError(error);
      })
      .finally(function () {
        // always executed
        console.log("ALL DONE LOADING DATA");
      });
  }

  // TODO: Cache for data in local of the device per day

  function formatResponse(response: { values: any[] }) {
    const numberOfWeekInAMonth = 4;
    const formatData: any = {};
    const firstIndex = 0;
    const secondIndex = 3;
    const indexIncrement = 4;
    for (let i = 0; i <= numberOfWeekInAMonth; i++) {
      if (i === numberOfWeekInAMonth) {
        const habitsData = response.values.slice(
          firstIndex + indexIncrement * i,
          secondIndex + indexIncrement * i
        );
        const [end, titles, data] = habitsData;
        const [habitTitle] = titles;
        const [habitsTodo] = data;
        formatData[habitTitle] = habitsTodo;
        break;
      }
      const weekData = response.values.slice(
        firstIndex + indexIncrement * i,
        secondIndex + indexIncrement * i
      );
      const firstWeek = i === 0;
      if (firstWeek) {
        const [headers, daysAdnTodo, daysTask, focus] = weekData;
        const firstRowData = removeEmptyFromArray(headers);
        const [weekTitle, todoTitle] = firstRowData;
        formatData[weekTitle] = {};
        daysTask.map((data: any, index: string | number) => {
          let weekObject: any = {};
          weekObject[`${daysAdnTodo[index]}`] = data;
          formatData[weekTitle] = {
            ...formatData[weekTitle],
            ...weekObject,
          };
        });
        formatData[todoTitle] = daysAdnTodo.pop();
      } else {
        const [headers, days, daysTask, focus] = weekData;
        const [weekTitle] = headers;
        daysTask.map((data: any, index: string | number) => {
          let weekObject: any = {};
          weekObject[`${days[index]}`] = data;
          formatData[weekTitle] = {
            ...formatData[weekTitle],
            ...weekObject,
          };
        });
      }
    }
    console.log(formatData);
    setAllSeriesData(formatData);
  }

  function onError(error: any) {
    console.error(error);
  }

  useEffect(() => {
    if (allSeriesData.length === 0) {
      getAllSeries();
    }
    console.log(allSeriesData);
  }, [allSeriesData]);

  return{
    allSeriesData
  }
};

