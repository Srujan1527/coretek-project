import moment from "moment";
export const getTimeDiff = (each: any) => {
  const postTimeStamp = each.created_at;

  const postDate: any = new Date(postTimeStamp);

  const currentDate: any = new Date();

  const timeDiffInMillis = currentDate - postDate;

  const duration = moment.duration(timeDiffInMillis);

  let humanizedTimeDiff;
  if (duration.asSeconds() < 60) {
    return (humanizedTimeDiff = `posted ${Math.floor(
      duration.asSeconds()
    )} seconds ago`);
  } else if (duration.asMinutes() < 60) {
    return (humanizedTimeDiff = `posted ${Math.floor(
      duration.asMinutes()
    )} minutes ago`);
  } else if (duration.asHours() < 24) {
    return (humanizedTimeDiff = `posted ${Math.floor(
      duration.asHours()
    )} hours ago`);
  } else {
    return (humanizedTimeDiff = `posted ${Math.floor(
      duration.asDays()
    )} days ago`);
  }
};
   // const fetchUserById = async (user_id: any) => {
  //   const options = {
  //     method: "GET",
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //     },
  //   };

  //   const userResponse = await fetch(`${BASE_URL}/users/${user_id}`, options);
  //   const user = await userResponse.json();
  //   console.log(user.username);
  // };