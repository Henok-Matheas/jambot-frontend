export const getUserSpecificUrl = (queryParams) => {
  console.log(queryParams);
  var queryParamMap = {
    name: "name",
    email: "email",
    chat_id: "chat_id",
    week_start: "week_start",
    week_end: "week_end",
  };

  var queryParameters = [];

  for (let element in queryParamMap) {
    queryParameters.push(`${element}=${queryParams.get(element)}`);
  }

  var tallyURL = queryParams.get("tallyURL");

  return tallyURL + "?" + queryParameters.join("&");
};
