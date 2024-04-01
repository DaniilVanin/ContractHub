SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[master](
	[statement_id] [int] IDENTITY(1,1) NOT NULL,
	[number_statement] [nvarchar](10) NOT NULL,
	[contract_period] [nvarchar](255) NULL,
	[start_practice] [date] NOT NULL,
	[fullname_comman] [nvarchar](100) NOT NULL,
	[position_comman] [nvarchar](255) NOT NULL,
	[phone_comman] [nvarchar](20) NULL,
	[email_comman] [nvarchar](50) NULL,
	[fullname_resper] [nvarchar](100) NOT NULL,
	[position_resper] [nvarchar](255) NOT NULL,
	[phone_resper] [nvarchar](20) NULL,
	[email_resper] [nvarchar](50) NULL,
	[fullname_comrudn] [nvarchar](100) NOT NULL,
	[position_comrudn] [nvarchar](255) NOT NULL,
	[phone_comrudn] [nvarchar](20) NULL,
	[email_comrudn] [nvarchar](50) NULL,
	[enterprise_name] [nvarchar](255) NULL,
	[enterprise_inn] [nvarchar](15) NOT NULL,
	[enterprise_kpp] [nvarchar](15) NULL,
	[enterprise_juridical_address] [nvarchar](255) NOT NULL,
	[enterprise_actual_address] [nvarchar](255) NULL,
	[enterprise_ogrn] [nvarchar](30) NULL,
	[enterprise_ogrnip] [nvarchar](30) NULL,
	[enterprise_rs] [nvarchar](50) NULL,
	[enterprise_ks] [nvarchar](50) NULL,
	[enteprise_bank] [nvarchar](255) NULL,
	[enterprise_bik] [nvarchar](20) NULL,
	[enterprise_email] [nvarchar](50) NULL
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[master] ADD PRIMARY KEY CLUSTERED 
(
	[statement_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
ALTER TABLE [dbo].[master] ADD UNIQUE NONCLUSTERED 
(
	[number_statement] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
