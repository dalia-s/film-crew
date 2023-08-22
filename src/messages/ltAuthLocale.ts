const ltTextsForAuth = {
  locale: 'lt',
  socialButtonsBlockButton: 'Prisijungti su {{provider|titleize}}',
  dividerText: 'arba',
  formFieldLabel__emailAddress: 'El. pašto adresas',
  formButtonPrimary: 'Toliau',
  backButton: 'Atgal',
  footerActionLink__useAnotherMethod: 'Naudokite kitą metodą',
  signUp: {
    start: {
      title: 'Sukurkite paskyrą',
      subtitle: 'prisijungti prie {{applicationName}}',
      actionText: 'Turite paskyrą?',
      actionLink: 'Prisijungti',
    },
    emailCode: {
      title: 'Pasitikrinkite e-paštą',
      subtitle: 'prisijungti prie {{applicationName}}',
      formTitle: 'Patvirtinimo kodas',
      formSubtitle: 'Įveskite patvirtinimo kodą atsiųstą jūsų adresu',
      resendButton: 'Negavote kodo? Siųsti dar kartą',
    },
  },
  signIn: {
    start: {
      title: 'Prisijungti',
      subtitle: 'prie {{applicationName}}',
      actionText: 'Neturite sąskaitos?',
      actionLink: 'Sukurkite paskyrą',
    },
    emailCode: {
      title: 'Pasitikrinkite e-paštą',
      subtitle: 'prisijungti prie {{applicationName}}',
      formTitle: 'Patvirtinimo kodas',
      formSubtitle: 'Įveskite patvirtinimo kodą atsiųstą jūsų adresu',
      resendButton: 'Negavote kodo? Siųsti dar kartą',
    },

    alternativeMethods: {
      title: 'Naudokite kitą metodą',
      actionLink: 'Pagalba',
      getHelp: {
        title: 'Pagalba',
        content: `Jei negalite prisijungti, parašykite mums.`,
        blockButton__emailSupport: 'Pagalbos adresas',
      },
    },
  },
} as const

export default ltTextsForAuth
