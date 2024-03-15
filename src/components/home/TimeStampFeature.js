export const calculateTimeDifference = (timestamp) => {
    // Convert the post timestamp and current time to Date objects
    const postTime = new Date(timestamp);
    const currentTime = new Date();
  
    // Calculate the absolute time difference in milliseconds
    const timeDifference = Math.abs(currentTime - postTime);
  
    // Calculate the time difference in hours
    const hoursDifference = Math.floor(timeDifference / (1000 * 60 * 60));
  
    // Check if the post was posted within the same hour
    if (hoursDifference === 0) {
      // If so, calculate the time difference in minutes
      const minutesDifference = Math.floor(timeDifference / (1000 * 60));
      // Return a string indicating the time difference in minutes
      return `Posted ${minutesDifference}min ago`;
    } else {
      // If the post was posted in a previous hour, return a string indicating the time difference in hours
      return `Posted ${hoursDifference}hr ago`;
    }
  };