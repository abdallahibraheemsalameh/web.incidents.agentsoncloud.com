export default {
  methods: {
    handleShowUsers: (assignees, responders, activeBtn) => {
      if (
        (activeBtn === "assignee" || activeBtn === "createdByMe") &&
        (!responders || !responders.length)
      ) {
        return "No reporter";
      } else if (
        (activeBtn === "assignee" || activeBtn === "createdByMe") &&
        responders &&
        responders.length === 1
      ) {
        return responders[0].name;
      } else if (
        activeBtn === "reporter" &&
        assignees &&
        assignees.length === 1
      ) {
        return assignees[0].name;
      }
      return "Show icon";
    },
  },
};
