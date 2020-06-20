require 'fog/aws'
require 'carrierwave'

CarrierWave.configure do |config|
  config.storage = :fog
  # config.s3_access_key_id ="AKIAQBQ5SZ4ZHKN7TFQD"
  # config.s3_secret_access_key = "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"
  # config.s3_bucket = "poembucketphotos"
  config.fog_credentials = {
    :provider               => 'AWS',                             # required
    :aws_access_key_id      => 'AKIAQBQ5SZ4ZHKN7TFQD',            # required
    :aws_secret_access_key  => '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',     # required
    :region                 => 'us-east-2'                        # optional, defaults to 'us-east-1'
  }
  config.fog_directory  = 'poembucketphotos'               # required
  config.fog_attributes = {'Cache-Control'=>'max-age=315576000'}  # optional, defaults to {}
end