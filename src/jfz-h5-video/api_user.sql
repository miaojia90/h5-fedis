/*
Navicat MySQL Data Transfer

Source Server         : huangyao
Source Server Version : 50173
Source Host           : bdm268275523.my3w.com:3306
Source Database       : bdm268275523_db

Target Server Type    : MYSQL
Target Server Version : 50173
File Encoding         : 65001

Date: 2017-07-10 17:47:15
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `api_user`
-- ----------------------------
DROP TABLE IF EXISTS `api_user`;
CREATE TABLE `api_user` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `username` varchar(30) CHARACTER SET utf8 DEFAULT NULL,
  `tel` varchar(15) CHARACTER SET utf8 DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=31 DEFAULT CHARSET=gbk;


