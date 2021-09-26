require 'fog/aws'
require 'carrierwave'

CarrierWave.configure do |config|
  config.storage = :fog
  # config.s3_access_key_id ="ASWS2DKIAQBQDK5SZ4ZTFQD"
  # config.s3_secret_access_key = "Rwln5VHajhsLBjbdNEaTR6LMYwMMRdsfWOzI"
  # config.s3_bucket = "poembucketphotos"
  config.fog_credentials = {
    :provider               => 'AWS',                             # required
    :aws_access_key_id      => 'ASWS2DKIAQBQDK5SZ4ZTFQD',            # required
    :aws_secret_access_key  => 'Rwln5VHajhsLBjbdNEaTR6LMYwMMRdsfWOzI',     # required
    :region                 => 'us-east-2'                        # optional, defaults to 'us-east-1'
  }
  config.fog_directory  = 'poembucketphotos'               # required
  config.fog_attributes = {'Cache-Control'=>'max-age=315576000'}  # optional, defaults to {}
end
