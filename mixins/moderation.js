export const REVIEW_STATUS = {
  APPROVED: 0,
  REJECTED: 1,
  WAITING: 2
}

export const MODERATION_TYPES = {
  TRICK: 'trick',
  CATEGORY: 'category',
  DIFFICULTY: 'difficulty',
}

export const VERSION_STATE = {
  LIVE: 0,
  STAGED: 1,
  OUTDATED: 2
}

const endpointResolver = (type) => {
  if (type === MODERATION_TYPES.TRICK) {
    return "tricks";
  }

  if (type === MODERATION_TYPES.CATEGORY) {
    return "categories";
  }

  if (type === MODERATION_TYPES.DIFFICULTY) {
    return "difficulties";
  }
};

const reviewStatusColor = status => {
  if(status === REVIEW_STATUS.APPROVED )
    return 'green'
  if(status === REVIEW_STATUS.REJECTED )
    return 'red'
  if(status === REVIEW_STATUS.WAITING )
    return 'orange'

  return ''
}

const reviewStatusIcon = status => {
  if(status === REVIEW_STATUS.APPROVED )
    return 'mdi-check'
  if(status === REVIEW_STATUS.REJECTED )
    return 'mdi-close'
  if(status === REVIEW_STATUS.WAITING )
    return 'mdi-clock'

  return ''
}

export const modItemRender = {
  methods:{
    endpointResolver,
    reviewStatusIcon,
    reviewStatusColor,
  }
}
