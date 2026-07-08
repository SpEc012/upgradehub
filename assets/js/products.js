/* ============================================================
   Upgrade Hub — product catalog + brand icons
   All icons are inline SVG (24x24 viewBox) so the site loads
   with zero external image requests.
   ============================================================ */

window.brandIcons = {
    spotify: '<path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>',
    netflix: '<path d="m5.398 0 8.348 23.602c2.346.059 4.856.398 4.856.398L10.113 0H5.398zm8.489 0v9.172l4.715 13.33V0h-4.715zM5.398 1.5V24c1.873-.225 2.81-.312 4.715-.398V14.83L5.398 1.5z"/>',
    youtube: '<path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>',
    primevideo: '<path d="M8.6 6.4v9.2a.6.6 0 0 0 .9.52l8-4.6a.6.6 0 0 0 0-1.04l-8-4.6a.6.6 0 0 0-.9.52z"/><path fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" d="M3.6 18.1c5 3 11.8 3 16.8-.1"/>',
    discord: '<path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z"/>',
    hbomax: '<path d="M3.784 8.716c-.655 0-1.32.29-2.173.946v-.78H0v6.236h1.715V11.24c.749-.592 1.091-.78 1.372-.78.333 0 .551.209.551.729v3.928h1.715V11.23c.748-.582 1.081-.769 1.372-.769.333 0 .55.208.55.728v3.928H8.99v-4.53c0-1.403-.8-1.871-1.57-1.871-.654 0-1.32.27-2.192.936-.28-.697-.894-.936-1.444-.936zm8.689 0c-1.705 0-3.118 1.466-3.118 3.284 0 1.82 1.413 3.285 3.118 3.285.842 0 1.57-.312 2.131-.988v.82h1.632V8.883h-1.632v.822c-.561-.676-1.29-.988-2.131-.988zm4.064.166c.707 1.102 1.507 2.09 2.443 3.077a26.593 26.593 0 0 0-2.443 3.16h2.069a13.603 13.603 0 0 1 1.673-2.183 14.067 14.067 0 0 1 1.632 2.182H24a25.142 25.142 0 0 0-2.432-3.16A23.918 23.918 0 0 0 24 8.883h-2.047a14.65 14.65 0 0 1-1.674 2.11 13.357 13.357 0 0 1-1.674-2.11zm-3.804 1.279c1.018 0 1.84.82 1.84 1.84a1.837 1.837 0 0 1-1.84 1.839c-1.019 0-1.84-.82-1.84-1.84 0-1.018.821-1.84 1.84-1.84zm0 .415c-.78 0-1.414.633-1.414 1.423s.634 1.424 1.413 1.424c.78 0 1.414-.634 1.414-1.424s-.634-1.424-1.414-1.424z"/>',
    peacock: '<g fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M12 20.5 1.9 17.2"/><path d="M12 20.5 4 12.4"/><path d="m12 20.5-2.9-11"/><path d="m12 20.5 2.9-11"/><path d="M12 20.5l8-8.1"/><path d="m12 20.5 10.1-3.3"/></g>',
    paramount: '<path d="M12 2.437c-6.627 0-12 5.373-12 12 0 2.669.873 5.133 2.346 7.126.503-.218.783-.542.983-.791l2.234-2.858a.467.467 0 0 1 .179-.138l.336-.146 3.674-4.659.534-.417 1.094-1.524a.482.482 0 0 1 .101-.102l.478-.347a.34.34 0 0 1 .398-.004l.578.407c.308.216.557.504.726.84l2.322 4.077c.051.09.09.129.182.174.454.227.732.268 1.33.913.277.304 1.495 1.666 3.203 3.784.236.318.538.588.963.783A11.948 11.948 0 0 0 24 14.437c0-6.627-5.373-12-12-12M3.236 15.1l-.778-.253-.48.662v-.818l-.778-.253.778-.253v-.818l.48.662.778-.253-.48.662Zm-.185 2.676-.252.778-.253-.778h-.818l.661-.481-.253-.777.663.48.66-.48-.252.777.662.481Zm.156-6.195.253.778-.661-.48-.663.48.253-.778-.66-.48h.817l.253-.778.252.777h.818Zm1.314-1.76L4.04 9.16l-.778.253.48-.661-.48-.663.778.254.48-.662v.818l.778.253-.777.252Zm2.045-2.862-.253.777-.252-.777h-.818l.662-.48-.253-.778.661.48.661-.48-.252.777.662.48Zm2.577-1.313-.48.661V5.49l-.779-.254.778-.253v-.817l.48.66.78-.253-.481.663.48.66zm3.265-.75.253.778-.661-.48-.662.48.252-.777-.66-.481h.818L12 3.637l.252.778h.818zm2.93.595v.816l-.481-.661-.777.252.48-.662-.48-.662.777.253.48-.66v.817l.779.252zm5.426 8.285.778.253.48-.662v.818l.778.253-.778.253v.818l-.48-.662-.778.253.48-.662zm-3.077-6.04-.253-.777h-.818l.662-.48-.253-.778.662.48.662-.48-.254.778.662.48h-.818zm1.792 2.086v-.818l-.777-.252.777-.253V7.68l.481.662.777-.254-.48.663.48.66-.777-.252zm1.469 1.278.253-.777.254.777h.816l-.66.481.252.778-.662-.48-.661.48.253-.778-.662-.48zm.506 6.676-.253.778-.253-.778h-.817l.662-.481-.253-.777.66.48.663-.48-.253.777.661.481z"/><path d="M16.347 21.373c.057-.084.151-.314-.025-.74l-.53-1.428c-.073-.182.084-.293.19-.173 0 0 1.004 1.157 1.264 1.64l.495.822c.425.028 1.6.06 2.732.06a3.26 3.26 0 0 1-.316-.364c-1.93-2.392-3.154-3.724-3.166-3.737-.391-.426-.572-.508-.87-.643a4.82 4.82 0 0 1-.138-.065v.364c0 .047-.057.073-.086.022l-2.846-5.001a1.598 1.598 0 0 0-.508-.587l-.277-.194-1.354 3.123c.212 0 .354.216.27.409l-1.25 2.893h1.147c.443 0 .883.087 1.294.255l.302.125s-.913 1.878-.913 2.867c0 .181.028.362.075.534h2.104l-.096-.595s1.266.294 2.502.413"/>',
    adobe: '<path d="M13.966 22.624l-1.69-4.281H8.122l3.892-9.144 5.662 13.425zM8.884 1.376H0v21.248zm15.116 0h-8.884L24 22.624z"/>',
    crunchyroll: '<path d="M2.909 13.436C2.914 7.61 7.642 2.893 13.468 2.898c5.576.005 10.137 4.339 10.51 9.819q.021-.351.022-.706C24.007 5.385 18.64.006 12.012 0S.007 5.36 0 11.988 5.36 23.994 11.988 24q.412 0 .815-.027c-5.526-.338-9.9-4.928-9.894-10.538Zm16.284.155a4.1 4.1 0 0 1-4.095-4.103 4.1 4.1 0 0 1 2.712-3.855 8.95 8.95 0 0 0-4.187-1.037 9.007 9.007 0 1 0 8.997 9.016q-.001-.847-.15-1.651a4.1 4.1 0 0 1-3.278 1.63Z"/>',
    disneyplus: '<path fill-rule="evenodd" d="M4.6 4.8h4a7.2 7.2 0 0 1 0 14.4h-4zm2.6 2.5v9.4h1.4a4.7 4.7 0 0 0 0-9.4z"/><path d="M17.1 8.9h2.1v2.6h2.6v2.1h-2.6v2.6h-2.1v-2.6h-2.6v-2.1h2.6z"/>',
    canva: '<path fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" d="M17.6 7.7A7.2 7.2 0 1 0 17.7 16"/>',
    nordvpn: '<path d="M2.2838 21.5414A11.9866 11.9866 0 010 14.4832C0 7.8418 5.3727 2.4586 12 2.4586c6.6279 0 12 5.3832 12 12.0246a11.9853 11.9853 0 01-2.2838 7.0582l-5.7636-9.3783-.5565.9419.5645 2.6186L12 8.9338l-2.45 4.1447.5707 2.6451-2.0764-3.5555-5.7605 9.3733z"/>',
    mcafee: '<path d="M12 4.8233L1.5793 0v19.1767L12 24l10.4207-4.8233V0zm6.172 11.626l-6.143 2.8428-6.1438-2.8429V6.6894l6.1439 2.8418 6.1429-2.8418z"/>',
    telegram: '<path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>',
    tiktok: '<path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>'
};

window.productCatalog = {
    spotify: {
        id: 'spotify',
        name: 'Spotify Premium',
        category: 'music',
        categoryLabel: 'Music',
        icon: 'spotify',
        accent: '#1DB954',
        tagline: 'Individual plan · 12 months',
        summary: 'Ad-free music, unlimited skips and offline downloads on your own personal account.',
        description: 'Your own dedicated Spotify Premium Individual subscription tied to your own email and password. Stream in 320kbps, download playlists for offline, and skip whatever you want — no shared accounts, no family seats, just yours.',
        featured: true,
        featuredPlan: 'year',
        features: [
            'Personal Premium Individual account',
            'Ad-free streaming + unlimited skips',
            'Offline downloads for tracks, albums and playlists',
            'High-quality audio up to 320kbps',
            'Works worldwide on every device',
            '12 months of coverage + refresh support'
        ],
        plans: [
            {
                id: 'year',
                label: '12 Months · Individual',
                promoPrice: 30,
                originalPrice: 119.88,
                billingLabel: '/yr',
                description: 'Full year of Spotify Premium Individual on your own account. Includes refreshes if needed.'
            }
        ]
    },
    netflix: {
        id: 'netflix',
        name: 'Netflix Premium',
        category: 'streaming',
        categoryLabel: 'Streaming',
        icon: 'netflix',
        accent: '#E50914',
        tagline: '4K UHD profile',
        summary: 'A dedicated 4K profile on a Premium account. No password-sharing headaches.',
        description: 'We drop you straight into a Premium Netflix account with your own locked profile. Enjoy Dolby Vision + Atmos where available, support for every country, and optional renewals.',
        featured: true,
        featuredPlan: '12mo',
        features: [
            'Dedicated Premium profile (never shared)',
            '4K + Dolby Vision + Atmos ready',
            'Works on TV, mobile, console & web',
            'Profile pin-lock + custom avatar',
            'Support team online 24/7'
        ],
        plans: [
            {
                id: '6mo',
                label: '6 Months',
                promoPrice: 22,
                originalPrice: 90,
                billingLabel: '/6 mo',
                description: 'Half-year Premium profile with UHD streaming and instant replacement warranty.'
            },
            {
                id: '12mo',
                label: '12 Months',
                promoPrice: 34.99,
                originalPrice: 180,
                billingLabel: '/yr',
                description: 'Full year of your own 4K profile on a Premium seat. Includes refresh coverage.'
            }
        ]
    },
    youtube: {
        id: 'youtube',
        name: 'YouTube Premium',
        category: 'music',
        categoryLabel: 'Music & Video',
        icon: 'youtube',
        accent: '#FF0033',
        tagline: 'Includes YouTube Music',
        summary: 'No ads, background play everywhere, and the full YouTube Music library included.',
        description: 'Skip every ad, keep videos running with your phone locked, and download anything for offline. Includes bundled YouTube Music Premium under the same login.',
        featured: true,
        featuredPlan: 'year',
        features: [
            'Zero ads on every video + Shorts',
            'Background play on iOS, Android and web',
            'Offline downloads for flights or road trips',
            'Full YouTube Music Premium included',
            '12 months validity + instant activation'
        ],
        plans: [
            {
                id: 'year',
                label: '12 Months',
                promoPrice: 45,
                originalPrice: 139,
                billingLabel: '/yr',
                description: 'Annual access to YouTube Premium + YouTube Music bundled.'
            }
        ]
    },
    'prime-video': {
        id: 'prime-video',
        name: 'Prime Video',
        category: 'streaming',
        categoryLabel: 'Streaming',
        icon: 'primevideo',
        accent: '#00A8E1',
        tagline: 'Global catalog',
        summary: 'Prime Originals, sports and regional catalogs with global library access.',
        description: 'Prime Video plus the core Prime membership delivered through regional pricing. Watch The Boys, Fallout, Reacher and the full global catalog on Fire TV, consoles, mobile and web.',
        featured: true,
        featuredPlan: 'year',
        features: [
            'Prime Video originals + Amazon Channels',
            'Regional movie + sports libraries',
            'Fire TV, consoles, mobile + web',
            'Multiple device streaming',
            '12-month coverage with refresh option'
        ],
        plans: [
            {
                id: 'year',
                label: '12 Months',
                promoPrice: 30,
                originalPrice: 140,
                billingLabel: '/yr',
                description: 'Full access to the Prime Video library + channels for 12 months.'
            }
        ]
    },
    'discord-boosts': {
        id: 'discord-boosts',
        name: 'Discord Server Boosts',
        category: 'discord',
        categoryLabel: 'Discord',
        icon: 'discord',
        accent: '#5865F2',
        tagline: 'Level 3 · 14-boost pack',
        summary: 'Hit Level 3 instantly and save up to $130 vs buying boosts from Discord.',
        description: 'We stack 14 high-quality boosts on your server manually, locked for either 30 or 90 days. Renew early, scale higher or request custom amounts on demand.',
        featured: true,
        featuredPlan: '1m',
        features: [
            'Manual delivery by staff (no bot risk)',
            'Instant Level 3 guarantee + replacements',
            'Custom boost counts available on request',
            'Crypto or CashApp accepted',
            '24/7 Discord ticket support'
        ],
        plans: [
            {
                id: '1m',
                label: '14 Boosts · 1 Month',
                promoPrice: 8,
                originalPrice: 48.86,
                billingLabel: '/pack',
                description: 'Instant Level 3 for 30 days. Includes redeployment guarantee if boosts drop.'
            },
            {
                id: '3m',
                label: '14 Boosts · 3 Months',
                promoPrice: 15,
                originalPrice: 146.58,
                billingLabel: '/pack',
                description: '90-day Level 3 lock plus a proactive refresh halfway through the term.'
            }
        ]
    },
    'discord-nitro': {
        id: 'discord-nitro',
        name: 'Discord Nitro + Boosts',
        category: 'discord',
        categoryLabel: 'Discord',
        icon: 'discord',
        accent: '#5865F2',
        tagline: '12 months · Boosts included',
        summary: 'A full year of Nitro with server boosts included — for less than half of retail.',
        description: 'One year of Discord Nitro on your own account: bigger uploads, HD streaming, custom emojis everywhere, animated avatar and profile themes — with your included server boosts ready to drop on any server you like.',
        featuredPlan: 'year',
        features: [
            'Full Nitro perks for 12 months',
            'Server boosts included',
            '500MB uploads + 4K/60fps streaming',
            'Custom emojis & soundboard everywhere',
            'Animated avatar, banner and profile themes',
            'Activated on your own account + warranty'
        ],
        plans: [
            {
                id: 'year',
                label: '12 Months · Nitro + Boosts',
                promoPrice: 40,
                originalPrice: 100,
                billingLabel: '/yr',
                description: 'A full year of Discord Nitro with your server boosts included. Replacement warranty for the whole term.'
            }
        ]
    },
    'hbo-max': {
        id: 'hbo-max',
        name: 'HBO Max',
        category: 'streaming',
        categoryLabel: 'Streaming',
        icon: 'hbomax',
        accent: '#9b6bff',
        tagline: 'Ultimate tier · 4K HDR',
        summary: 'The top HBO Max tier with 4K UHD, Dolby Atmos and week-of-release Warner movies.',
        description: 'The full HBO Max Ultimate tier with 4K UHD, Dolby Atmos, downloads and ad-free streaming on every device — linked to your own email so billing shows the plan natively.',
        featured: true,
        featuredPlan: 'year',
        features: [
            'HBO Max Ultimate (top tier) for 12 months',
            '4K UHD + Dolby Atmos / Vision support',
            'Offline downloads on mobile and tablet',
            'Up to 4 simultaneous streams',
            'Warner Bros theatrical releases included'
        ],
        plans: [
            {
                id: 'year',
                label: '12 Months · Ultimate',
                promoPrice: 45,
                originalPrice: 200,
                billingLabel: '/yr',
                description: 'Full year of HBO Max Ultimate with 4K and Atmos.'
            }
        ]
    },
    peacock: {
        id: 'peacock',
        name: 'Peacock Premium+',
        category: 'streaming',
        categoryLabel: 'Streaming',
        icon: 'peacock',
        accent: '#ffb84d',
        tagline: 'Live sports · Ad-free',
        summary: 'NFL Sunday Night, WWE, NBC originals and live sports — all ad-free.',
        description: 'Peacock Premium Plus gives you the full library ad-free, downloads for offline, and access to NBC live channels including major sports streams and exclusive WWE events.',
        featuredPlan: 'year',
        features: [
            'Premium Plus tier — fully ad-free',
            'NFL, WWE Premium Live Events, Premier League',
            'Offline downloads for episodes & movies',
            'NBC live channels included',
            'Works on every Peacock-supported device'
        ],
        plans: [
            {
                id: 'year',
                label: '12 Months · Premium+',
                promoPrice: 45,
                originalPrice: 170,
                billingLabel: '/yr',
                description: 'Annual Peacock Premium+ membership, ad-free with downloads.'
            }
        ]
    },
    paramount: {
        id: 'paramount',
        name: 'Paramount+ & SHOWTIME',
        category: 'streaming',
        categoryLabel: 'Streaming',
        icon: 'paramount',
        accent: '#0064ff',
        tagline: 'Top-tier bundle',
        summary: 'Yellowstone, Star Trek, NFL on CBS and SHOWTIME originals in one bundle.',
        description: 'The top-tier Paramount+ plan with SHOWTIME bundled in. Includes live CBS, SHOWTIME originals, full NFL on CBS, UEFA Champions League and the entire Paramount catalog.',
        featuredPlan: 'year',
        features: [
            'Paramount+ with SHOWTIME bundle',
            'Live CBS + NFL on CBS + UCL soccer',
            'SHOWTIME originals & full Paramount library',
            '4K UHD + downloads + ad-free',
            '12-month coverage with refresh option'
        ],
        plans: [
            {
                id: 'year',
                label: '12 Months · SHOWTIME bundle',
                promoPrice: 50,
                originalPrice: 140,
                billingLabel: '/yr',
                description: 'Annual top-tier Paramount+ with SHOWTIME included.'
            }
        ]
    },
    disney: {
        id: 'disney',
        name: 'Disney+ Premium',
        category: 'streaming',
        categoryLabel: 'Streaming',
        icon: 'disneyplus',
        accent: '#4da6ff',
        tagline: '4 screens · 4K HDR',
        summary: 'Disney, Pixar, Marvel, Star Wars & NatGeo with ad-free playback.',
        description: 'Your email gets linked to a regional Disney+ subscription with 4K HDR streams, up to four devices at once and seven profiles.',
        featuredPlan: 'year',
        features: [
            'Ad-free streaming + downloads',
            'Watch on 4 devices simultaneously',
            'Kids profile controls + avatars',
            'UHD + HDR10 support',
            'Instant invite, renew anytime'
        ],
        plans: [
            {
                id: 'year',
                label: '12 Months',
                promoPrice: 63,
                originalPrice: 109.99,
                billingLabel: '/yr',
                description: 'Annual Disney+ Premium with UHD streaming.'
            }
        ]
    },
    crunchyroll: {
        id: 'crunchyroll',
        name: 'Crunchyroll Premium',
        category: 'streaming',
        categoryLabel: 'Anime',
        icon: 'crunchyroll',
        accent: '#F47521',
        tagline: 'Fan or Mega Fan',
        summary: 'New episodes one hour after Japan, ad-free with download support.',
        description: 'Pick Fan for single-stream viewing or Mega Fan for four streams + offline downloads and merch perks.',
        featuredPlan: 'megafan',
        features: [
            'Entire Crunchyroll + Funimation vault',
            'New anime 1 hour after airing in Japan',
            'Offline downloads for binging',
            'Redeemable on your own email',
            'Priority renewal slots'
        ],
        plans: [
            {
                id: 'fan',
                label: 'Fan · 12 Months',
                promoPrice: 32.99,
                originalPrice: 80,
                billingLabel: '/yr',
                description: 'Single stream, ad-free catalog access and simulcasts.'
            },
            {
                id: 'megafan',
                label: 'Mega Fan · 12 Months',
                promoPrice: 39.99,
                originalPrice: 120,
                billingLabel: '/yr',
                description: 'Four devices at once, offline downloads, merch discounts.'
            }
        ]
    },
    adobe: {
        id: 'adobe',
        name: 'Adobe Creative Cloud',
        category: 'creative',
        categoryLabel: 'Creative',
        icon: 'adobe',
        accent: '#FF3333',
        tagline: 'All apps · 1TB storage',
        summary: 'The full suite — Photoshop, Premiere, After Effects and 20+ apps on your email.',
        description: 'We onboard you into an enterprise tenant so Adobe shows the plan in your billing. Works on Windows, macOS and iPad with 1TB of cloud storage.',
        featuredPlan: 'year',
        features: [
            '20+ Adobe apps unlocked',
            '1TB cloud storage + Adobe Fonts',
            'Visible in your Adobe billing portal',
            'Instant replacement if revoked',
            'Enterprise-grade licensing'
        ],
        plans: [
            {
                id: 'year',
                label: '12 Months',
                promoPrice: 64.99,
                originalPrice: 659.88,
                billingLabel: '/yr',
                description: 'Full suite for 12 months under enterprise licensing.'
            }
        ]
    },
    canva: {
        id: 'canva',
        name: 'Canva Pro',
        category: 'creative',
        categoryLabel: 'Creative',
        icon: 'canva',
        accent: '#00C4CC',
        tagline: 'Pro workspace',
        summary: 'Premium templates, brand kits, background remover and content scheduler.',
        description: 'Give your brand unlimited premium assets and AI-powered tools like Magic Resize and background remover.',
        featuredPlan: 'year',
        features: [
            '100M+ premium photos & graphics',
            'Brand Kit with fonts + palettes',
            'Magic Resize & AI background remover',
            '100GB cloud storage per team',
            'Social planner + content calendar'
        ],
        plans: [
            {
                id: 'year',
                label: '12 Months',
                promoPrice: 35,
                originalPrice: 120,
                billingLabel: '/yr',
                description: 'Annual Canva Pro workspace with team seats.'
            }
        ]
    },
    nordvpn: {
        id: 'nordvpn',
        name: 'NordVPN',
        category: 'security',
        categoryLabel: 'Security',
        icon: 'nordvpn',
        accent: '#4687FF',
        tagline: '6 devices · Meshnet',
        summary: 'Protect six devices with 5,500+ servers, Meshnet and Threat Protection.',
        description: 'Bypass geo locks, secure your traffic and share files safely. Comes with ad blocker, malware shield and optional dedicated IP upgrade.',
        featuredPlan: 'year',
        features: [
            '6 simultaneous device connections',
            'Meshnet device linking + routing',
            'Threat Protection Pro (ad + malware block)',
            'Double VPN + Onion over VPN routes',
            '24/7 live chat + app support'
        ],
        plans: [
            {
                id: 'year',
                label: '12 Months',
                promoPrice: 27,
                originalPrice: 99,
                billingLabel: '/yr',
                description: 'Annual NordVPN account with Threat Protection unlocked.'
            }
        ]
    },
    mcafee: {
        id: 'mcafee',
        name: 'McAfee Total Protection',
        category: 'security',
        categoryLabel: 'Security',
        icon: 'mcafee',
        accent: '#e5382c',
        tagline: 'Unlimited devices',
        summary: 'Antivirus + VPN + identity monitoring for every device in the house.',
        description: 'Covers Windows, macOS, iOS and Android with password manager, VPN, dark web monitoring and performance tune-ups.',
        featuredPlan: 'year',
        features: [
            'Unlimited devices covered',
            'Secure VPN with auto-connect',
            'Dark web + identity alerts',
            'Password manager + file shredder',
            'Performance optimizer tools'
        ],
        plans: [
            {
                id: 'year',
                label: '12 Months',
                promoPrice: 24.99,
                originalPrice: 199.99,
                billingLabel: '/yr',
                description: 'One year of Total Protection for unlimited devices.'
            }
        ]
    }
};

window.featuredProductIds = ['spotify', 'netflix', 'youtube', 'prime-video', 'discord-boosts', 'hbo-max'];

window.fullCatalogOrder = [
    'spotify',
    'netflix',
    'youtube',
    'prime-video',
    'discord-boosts',
    'discord-nitro',
    'hbo-max',
    'peacock',
    'paramount',
    'disney',
    'crunchyroll',
    'adobe',
    'canva',
    'nordvpn',
    'mcafee'
];

window.catalogCategories = [
    { id: 'all', label: 'All' },
    { id: 'streaming', label: 'Streaming' },
    { id: 'music', label: 'Music & Video' },
    { id: 'creative', label: 'Creative' },
    { id: 'security', label: 'Security' },
    { id: 'discord', label: 'Discord' }
];

window.contactEndpoints = {
    discord: 'https://discord.gg/rb5DEqWBzg',
    telegram: 'https://t.me/xhoec',
    tiktok: 'https://www.tiktok.com/@upgradehub00'
};
