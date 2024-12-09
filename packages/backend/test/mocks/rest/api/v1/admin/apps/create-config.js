const createAppConfigMock = (appConfig) => {
  return {
    data: {
      key: appConfig.key,
      useOnlyPredefinedAppAuths: appConfig.useOnlyPredefinedAppAuths,
      disabled: appConfig.disabled,
    },
    meta: {
      count: 1,
      currentPage: null,
      isArray: false,
      totalPages: null,
      type: 'AppConfig',
    },
  };
};

export default createAppConfigMock;
