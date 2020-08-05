export const statisticsCurves = {
  PROFILE_VIEW: { ID: 1, color: "84, 216, 255", label: "Views" },
  PROFILE_FOLLOW: { ID: 2, color: "220, 28, 117", label: "Follows" },
  INVITATION_SENT: { ID: 3, color: "34, 201, 173", label: "Connections sent" },
  MESSAGE_SENT: { ID: 4, color: "57, 130, 239", label: "Messages sent" },
  INMAIL_SENT: { ID: 5, color: "242, 96, 41", label: "InMails sent" },

  INVITATION_ACCEPTED: { ID: 6, color: "147, 61, 169", label: "Connections accepted" },
  // This is a reply for message and InMail
  MESSAGE_REPLY: { ID: 7, color: "255, 194, 30", label: "Replies received" },
  // rates
  INVITATION_ACCEPTED_RATE: { ID: 8, color: "255, 10, 10", label: "Acceptance rate" },
  MESSAGE_REPLY_RATE: { ID: 9, color: "12, 49, 119", label: "Response rate" },
}

export const getStatisticsObject = statisticsID => {
  for (const curve in statisticsCurves) {
    if (statisticsCurves.hasOwnProperty(curve) && statisticsCurves[curve].ID == statisticsID) {
      return statisticsCurves[curve]
    }
  }
}
