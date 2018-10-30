# Host: 192.168.3.110  (Version 5.7.18)
# Date: 2018-10-30 16:37:45
# Generator: MySQL-Front 6.1  (Build 1.16)


#
# Structure for table "file_info"
#

CREATE TABLE `file_info` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `file_name` varchar(20) NOT NULL DEFAULT '',
  `file_path` varchar(255) NOT NULL DEFAULT '',
  `file_type` tinyint(3) NOT NULL DEFAULT '0' COMMENT '文件类型，1：章程 ，2其它',
  `createtime` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='文件信息表，提供下载的公共文件';

#
# Data for table "file_info"
#


#
# Structure for table "find_pwd"
#

CREATE TABLE `find_pwd` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(30) NOT NULL DEFAULT '',
  `validCode` varchar(50) NOT NULL DEFAULT '',
  `outDate` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  PRIMARY KEY (`Id`),
  KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='找回密码表，记录找回码和时间';

#
# Data for table "find_pwd"
#


#
# Structure for table "group"
#

CREATE TABLE `group` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(20) NOT NULL DEFAULT '',
  `create_time` timestamp(6) NULL DEFAULT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='作品组别表';

#
# Data for table "group"
#


#
# Structure for table "judge"
#

CREATE TABLE `judge` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(20) NOT NULL DEFAULT '',
  `headicon` varchar(100) NOT NULL DEFAULT '',
  `sub_title` varchar(120) DEFAULT NULL,
  `category` tinyint(3) NOT NULL DEFAULT '0' COMMENT '0：评委/1：导师',
  `description` varchar(1600) DEFAULT NULL,
  `email` varchar(30) DEFAULT '',
  `password` varchar(20) DEFAULT NULL,
  `validCode` varchar(60) DEFAULT NULL,
  `createtime` timestamp(6) NULL DEFAULT NULL,
  `sequence` tinyint(3) NOT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='评委信息表';

#
# Data for table "judge"
#


#
# Structure for table "news"
#

CREATE TABLE `news` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(50) NOT NULL DEFAULT '',
  `news_abstract` varchar(255) NOT NULL DEFAULT '',
  `thumb` varchar(130) NOT NULL DEFAULT '',
  `publish_time` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `content` text NOT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='新闻表';

#
# Data for table "news"
#


#
# Structure for table "permission"
#

CREATE TABLE `permission` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `permission_name` varchar(30) NOT NULL DEFAULT '',
  `createtime` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

#
# Data for table "permission"
#


#
# Structure for table "production"
#

CREATE TABLE `production` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(30) NOT NULL DEFAULT '',
  `title_en` varchar(255) DEFAULT NULL,
  `userId` int(11) NOT NULL DEFAULT '0',
  `pImage` varchar(512) DEFAULT NULL,
  `content` text NOT NULL,
  `content_en` text,
  `status` tinyint(3) DEFAULT NULL,
  `participant_type` tinyint(3) NOT NULL DEFAULT '0' COMMENT '1:个人，2：团队，3：企业',
  `participant_name` varchar(60) DEFAULT NULL,
  `participant_id_number` varchar(25) NOT NULL DEFAULT '' COMMENT '身份证号码，营业执照号码',
  `participant_brief` varchar(600) DEFAULT NULL,
  `adviser` varchar(60) DEFAULT NULL,
  `team_member` varchar(100) DEFAULT NULL,
  `affiliatedUnit` varchar(30) DEFAULT NULL,
  `weblink` varchar(255) DEFAULT NULL,
  `score` float(5,2) DEFAULT '0.00',
  `round` tinyint(3) DEFAULT '0',
  `create_time` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `attach_file` varchar(100) DEFAULT NULL,
  `groupNum` tinyint(3) DEFAULT NULL,
  `subGroupNum` text,
  PRIMARY KEY (`Id`),
  KEY `groupId` (`userId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='作品表';

#
# Data for table "production"
#


#
# Structure for table "review"
#

CREATE TABLE `review` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `productionId` int(11) NOT NULL DEFAULT '0' COMMENT '作品ID',
  `userId` int(11) NOT NULL DEFAULT '0' COMMENT '评审员ID',
  `score` tinyint(3) NOT NULL DEFAULT '0',
  `createtime` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `round` tinyint(3) NOT NULL DEFAULT '0',
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='评审表';

#
# Data for table "review"
#


#
# Structure for table "role"
#

CREATE TABLE `role` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `rolename` varchar(10) NOT NULL DEFAULT '',
  `createtime` timestamp(6) NULL DEFAULT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

#
# Data for table "role"
#

INSERT INTO `role` VALUES (1,'管理员','2017-03-29 03:04:16.985000'),(2,'评委','2017-03-29 03:10:28.080000'),(3,'竞赛者','2017-03-29 03:10:44.452000');

#
# Structure for table "permission_role"
#

CREATE TABLE `permission_role` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `roleId` int(11) NOT NULL DEFAULT '0',
  `permissionId` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`Id`),
  KEY `role_permission` (`roleId`),
  KEY `permission_role` (`permissionId`),
  CONSTRAINT `permission_role` FOREIGN KEY (`permissionId`) REFERENCES `permission` (`Id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `role_permission` FOREIGN KEY (`roleId`) REFERENCES `role` (`Id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

#
# Data for table "permission_role"
#


#
# Structure for table "round_judge"
#

CREATE TABLE `round_judge` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `roundName` varchar(20) NOT NULL DEFAULT '',
  `judge` varchar(60) DEFAULT '',
  `describes` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

#
# Data for table "round_judge"
#


#
# Structure for table "rule"
#

CREATE TABLE `rule` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(50) NOT NULL DEFAULT '',
  `context` text NOT NULL,
  `createTime` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='保存章程信息';

#
# Data for table "rule"
#


#
# Structure for table "send_email"
#

CREATE TABLE `send_email` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(40) NOT NULL DEFAULT '',
  `sign` tinyint(3) NOT NULL DEFAULT '0' COMMENT '1：success 2:failure',
  `round` tinyint(3) DEFAULT '0',
  `remark` varchar(15) DEFAULT '',
  `createtime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='记录邮件发送记录';

#
# Data for table "send_email"
#


#
# Structure for table "stage"
#

CREATE TABLE `stage` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(20) NOT NULL DEFAULT '',
  `time_range` varchar(15) NOT NULL DEFAULT '',
  `rank` tinyint(3) NOT NULL DEFAULT '0',
  `create_time` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='竞赛阶段设置表';

#
# Data for table "stage"
#


#
# Structure for table "user"
#

CREATE TABLE `user` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(30) NOT NULL DEFAULT '',
  `password` varchar(40) NOT NULL DEFAULT '',
  `createtime` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `realname` varchar(20) DEFAULT '',
  `mobile` varchar(18) DEFAULT NULL,
  `address` varchar(50) DEFAULT NULL,
  `valid` tinyint(3) NOT NULL DEFAULT '0',
  `slot` varchar(40) DEFAULT NULL,
  `activecode` varchar(60) DEFAULT '',
  `activesign` tinyint(3) DEFAULT NULL,
  PRIMARY KEY (`Id`),
  KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

#
# Data for table "user"
#

INSERT INTO `user` VALUES (1,'cidic@cidic.cn','3192ee7236ede36ef5bca812a7e3973e','2017-05-25 02:50:55.289000','中意创新中心','18684799929','湖南省长沙市后湖国际艺术区',0,'9ee76451f8478d8125c0b717cb5b6586','b12d4da5359f412e527b2e595a65ed5c',1),(2,'maximuslee@126.com','44a8bfb12d55a2fdfb88d46434ce9b1f','2017-05-25 02:50:55.988000','中意创新中心','18684799929','湖南省长沙市后湖国际艺术区',0,'66ffd2b36aa211b758bf7dfb64603ecd','db96b46404a64433a7cb45f2baf73daa',1),(3,'liling@cidic.cn','4db8caa473975b84b65dd3e954f11dc6','2017-05-25 04:58:02.171000','lee','18684799929','长沙理工大学',0,'175717e5228817735e68ee2902ce5189','755ad9518842667fad8763989bcafa55',1);

#
# Structure for table "user_role"
#

CREATE TABLE `user_role` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) NOT NULL DEFAULT '0',
  `roleId` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`Id`),
  KEY `user` (`userId`),
  KEY `role` (`roleId`),
  CONSTRAINT `role` FOREIGN KEY (`roleId`) REFERENCES `role` (`Id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `user` FOREIGN KEY (`userId`) REFERENCES `user` (`Id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

#
# Data for table "user_role"
#

INSERT INTO `user_role` VALUES (1,1,1),(2,2,1),(3,3,3);
